import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromBook from '../book.reducer';
import * as fromUser from '../../user/user.reducer';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AddBookToCollection} from '../../collection/actions/collection.actions';
import {Book, BookOwner} from '../../common/book.model';
import {AddBorrowing} from '../../borrowing/borrowing.actions';
import {BookActionsPopoverComponent} from '../components/book-actions-popover/book-actions-popover.component';
import {AlertController, PopoverController} from '@ionic/angular';
import {Dictionary} from '@ngrx/entity';
import {User} from '../../user/user.model';

@Component({
  selector: 'book-details-page',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="Zurück"></ion-back-button>
        </ion-buttons>

        <ion-title>{{(book$ | async)?.title}}</ion-title>

        <ion-buttons slot="end">
          <ion-button icon-only (click)="onShowBookActionsPopover($event)">
            <ion-icon name="more"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-book-details
        [book]="book$ | async"
        [users]="users$ | async"
        [openDescription]="true"
        (borrowRequest)="onBorrowRequest($event)"></app-book-details>
    </ion-content>
  `
})
export class BookDetailsPage implements OnInit {

  book$: Observable<Book>;
  users$: Observable<Dictionary<User>>;

  constructor(private store: Store<fromBook.BookState>,
              private activatedRoute: ActivatedRoute,
              private popoverCtrl: PopoverController,
              private alertController: AlertController) {
  }

  ngOnInit() {
    const bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.book$ = this.store.pipe(select(fromBook.selectEntity(bookId)));
    this.users$ = this.store.pipe(select(fromUser.selectEntities));
  }

  onAddToCollection(book: Book) {
    this.store.dispatch(new AddBookToCollection({book}));
  }

  async onBorrowRequest(event: { book: Book, bookOwner: BookOwner }) {
    const alert = await this.alertController.create({
      header: `Leihanfrage an ${event.bookOwner.ownerId}`,
      subHeader: `${event.book.title}`,
      message: 'Möchtest du die Anfrage verschicken?',
      buttons: [{
        text: 'Ja',
        handler: () => {
          this.store.dispatch(new AddBorrowing({bookOwner: event.bookOwner}));
        }
      }, {
        text: 'Doch nicht',
        role: 'cancel'
      }],
    });

    await alert.present();
  }

  async onShowBookActionsPopover(event) {
    console.log('onShowBookActionsPopover');
    const popover = await this.popoverCtrl.create({
      component: BookActionsPopoverComponent,
      componentProps: {
        book$: this.book$
      },
      event: event
    });

    popover.onDidDismiss().then((result) => {
      if (result && result.data && result.data.addToCollection) {
        this.onAddToCollection(result.data.addToCollection);
      }
    });

    return await popover.present();
  }
}
