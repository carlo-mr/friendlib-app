import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromCollection from '../reducers/collection.reducer';
import * as fromBorrowing from '../../borrowing/borrowing.reducer';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AddBookToCollection, RemoveExemplar} from '../../collection/actions/collection.actions';
import {Book} from '../../common/book.model';
import {Collection, Exemplar} from '../../common/collection.model';
import {map, tap} from 'rxjs/operators';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {LoggedUser} from '../../auth/models/auth.model';
import {PopoverController} from '@ionic/angular';
import {BorrowingPopoverComponent} from '../../book-details/borrowing-popover/borrowing-popover.component';
import {Borrowing} from '../../common/borrowing.model';
import {LoadExemplarBorrowings, UpdateBorrowing} from '../../borrowing/borrowing.actions';

@Component({
  selector: 'exemplar-details-page',
  styles: [`.avatar-small {
    width: 40px;
  }`],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="Zurück"></ion-back-button>
        </ion-buttons>
        <ion-title>{{(exemplar$ | async)?.book.title}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-book-details [book]="(exemplar$ | async)?.book"></app-book-details>

      <ng-container *ngIf="(exemplarBorrowings$ | async) != null && (exemplarBorrowings$ | async)?.length > 0">
        <app-exemplar-borrowing-list [exemplarBorrowings]="exemplarBorrowings$ | async"
                                     (exemplarBorrowingUpdate)="onUpdateBorrowing($event)">

        </app-exemplar-borrowing-list>
      </ng-container>

      <app-exemplar-links
        [exemplar]="exemplar$ | async"
        [user]="user$ | async"
        (removeExemplar)="onRemoveExemplar($event)"></app-exemplar-links>
    </ion-content>
  `
})
export class ExemplarDetailsPage implements OnInit {

  collection$: Observable<Collection>;
  exemplar$: Observable<Exemplar>;
  exemplarBorrowings$: Observable<Borrowing[]>;

  user$: Observable<LoggedUser>;
  private exemplarId: string;
  Object = Object;

  constructor(private store: Store<fromCollection.CollectionState>,
              private activatedRoute: ActivatedRoute,
              private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    const ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId');
    this.exemplarId = this.activatedRoute.snapshot.paramMap.get('exemplarId');

    this.collection$ = this.store.pipe(select(fromCollection.selectEntity(ownerId)));
    this.exemplar$ = this.store.pipe(
      select(fromCollection.selectEntity(ownerId)),
      map((collection: Collection) => collection.exemplars.find((exemplar: Exemplar) => exemplar.exemplarId === this.exemplarId))
    );

    this.user$ = this.store.pipe(select(fromAuth.getLoggedUser));

    this.exemplarBorrowings$ = this.store.pipe(
      select(fromBorrowing.selectBorrowingsForExemplarId(this.exemplarId)),
      tap((borrowings: Borrowing[]) => console.log('exemplarBorrowings', borrowings))
    );

    this.store.dispatch(new LoadExemplarBorrowings({exemplarId: this.exemplarId}));
  }

  onAddToCollection(book: Book) {
    this.store.dispatch(new AddBookToCollection({book}));
  }

  onRemoveExemplar(exemplar: Exemplar) {
    this.store.dispatch(new RemoveExemplar({exemplar}));
  }

  onUpdateBorrowing(borrowing: Borrowing, action: string) {
    this.store.dispatch(new UpdateBorrowing({borrowing: borrowing, action: action}));
  }

  async onBorrowingClicked(borrowing: Borrowing) {
    const popover = await this.popoverCtrl.create({
      component: BorrowingPopoverComponent,
      componentProps: {
        borrowing: borrowing
      },
      event: event
    });

    popover.onDidDismiss().then((result) => {
      if (result && result.data && result.data.action) {
        this.store.dispatch(new UpdateBorrowing({borrowing: borrowing, action: result.data.action}));
      }
    });

    return await popover.present();
  }
}
