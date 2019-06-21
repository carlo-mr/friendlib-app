import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromCollection from '../reducers/collection.reducer';
import * as fromExemplar from '../../exemplar/exemplar.reducer';
import * as fromBorrowing from '../../borrowing/borrowing.reducer';
import * as fromBook from '../../book/book.reducer';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AddBookToCollection, RemoveExemplar} from '../../collection/actions/collection.actions';
import {Book} from '../../common/book.model';
import {Collection} from '../../common/collection.model';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {LoggedUser} from '../../auth/models/auth.model';
import {PopoverController} from '@ionic/angular';
import {Borrowing} from '../../common/borrowing.model';
import {AcceptBorrowing, CompleteBorrowing, ReceiveBorrowing, RejectBorrowing, UpdateBorrowing} from '../../borrowing/borrowing.actions';
import {Dictionary} from '@ngrx/entity';
import {User} from '../../user/user.model';
import * as fromUser from '../../user/user.reducer';
import {ExemplarActionsPopoverComponent} from '../../book-details/components/exemplar-actions-popover/exemplar-actions-popover.component';
import {Exemplar} from '../../common/exemplar.model';

@Component({
  selector: 'exemplar-details-page',
  styles: [`.avatar-small {
    width: 40px;
  }`],
  template: `
    <ng-container *ngIf="this.book$ | async as book">
      <ng-container *ngIf="exemplar$ | async as exemplar">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button text="Zurück"></ion-back-button>
            </ion-buttons>

            <ion-title>{{book?.title}}</ion-title>

            <ion-buttons *ngIf="exemplar._links" slot="end">
              <ion-button icon-only (click)="onShowExemplarActionsPopover($event)">
                <ion-icon name="more"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <app-book-details [book]="book"
                            [users]="users$ | async"
                            [openDescription]="false"
                            [exemplarOwner]="exemplar.ownerId"></app-book-details>

          <ng-container *ngIf="borrowings$ | async as borrowings">
            <app-exemplar-borrowing-list [exemplarBorrowings]="borrowings"
                                         (exemplarBorrowingUpdate)="onUpdateBorrowing($event)"
                                         [users]="users$ | async">

            </app-exemplar-borrowing-list>
          </ng-container>
        </ion-content>
      </ng-container>
    </ng-container>
  `
})
export class ExemplarDetailsPage implements OnInit {

  collection$: Observable<Collection>;
  exemplar$: Observable<Exemplar>;

  users$: Observable<Dictionary<User>>;

  user$: Observable<LoggedUser>;
  borrowings$: Observable<Borrowing[]>;
  book$: Observable<Book>;

  private exemplarId: string;

  constructor(private store: Store<fromCollection.CollectionState>,
              private activatedRoute: ActivatedRoute,
              private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    const ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId');
    this.exemplarId = this.activatedRoute.snapshot.paramMap.get('exemplarId');

    this.collection$ = this.store.pipe(select(fromCollection.selectEntity(ownerId)));
    this.exemplar$ = this.store.pipe(
      select(fromExemplar.selectEntity(this.exemplarId))
    );

    this.exemplar$.subscribe((exemplar: Exemplar) => {
      this.book$ = this.store.pipe(select(fromBook.selectByBookId(exemplar.book)));
    });


    this.borrowings$ = this.store.pipe(select(fromBorrowing.selectBorrowingsForExemplarId(this.exemplarId)));
    this.user$ = this.store.pipe(select(fromAuth.getLoggedUser));

    // TODO only load necessary users, via guard?
    this.users$ = this.store.pipe(select(fromUser.selectEntities));
  }

  onAddToCollection(book: Book) {
    this.store.dispatch(new AddBookToCollection({book}));
  }

  onRemoveExemplar(exemplar: Exemplar) {
    this.store.dispatch(new RemoveExemplar({exemplar}));
  }

  onUpdateBorrowing(update: { borrowing: Borrowing, action: string }) {
    switch (update.action) {
      case 'accept':
        this.store.dispatch(new AcceptBorrowing({borrowing: update.borrowing, action: update.action}));
        break;
      case 'reject':
        this.store.dispatch(new RejectBorrowing({borrowing: update.borrowing, action: update.action}));
        break;
      case 'receive':
        this.store.dispatch(new ReceiveBorrowing({borrowing: update.borrowing, action: update.action}));
        break;
      case 'complete':
        this.store.dispatch(new CompleteBorrowing({borrowing: update.borrowing, action: update.action}));
        break;
      default:
        this.store.dispatch(new UpdateBorrowing({borrowing: update.borrowing, action: update.action}));
    }
  }

  async onShowExemplarActionsPopover(event) {

    const popover = await this.popoverCtrl.create({
      component: ExemplarActionsPopoverComponent,
      componentProps: {
        exemplar$: this.exemplar$,
        user$: this.user$
      },
      event: event
    });

    popover.onDidDismiss().then((result => {
      if (result && result.data && result.data.deleteExemplar) {
        this.onRemoveExemplar(result.data.deleteExemplar);
      }
    }));

    return await popover.present();
  }
}

