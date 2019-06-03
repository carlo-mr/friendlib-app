import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromBook from '../book.reducer';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AddBookToCollection} from '../../collection/actions/collection.actions';
import {Book, BookOwner} from '../../common/book.model';
import {AddBorrowing} from '../../borrowing/borrowing.actions';

@Component({
  selector: 'book-details-page',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="Zurück"></ion-back-button>
        </ion-buttons>
        <ion-title>{{(book$ | async)?.title}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-book-details
        [book]="book$ | async"></app-book-details>

      <app-book-links
        [book]="book$ | async"
        (addToCollection)="onAddToCollection($event)"
        (borrowRequest)="onBorrowRequest($event)"></app-book-links>
    </ion-content>
  `
})
export class BookDetailsPage implements OnInit {

  book$: Observable<Book>;

  constructor(private store: Store<fromBook.BookState>, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.book$ = this.store.pipe(select(fromBook.selectEntity(bookId)));
  }

  onAddToCollection(book: Book) {
    this.store.dispatch(new AddBookToCollection({book}));
  }

  onBorrowRequest(bookOwner: BookOwner) {
    this.store.dispatch(new AddBorrowing({exemplarId: bookOwner.exemplarId}));
  }
}
