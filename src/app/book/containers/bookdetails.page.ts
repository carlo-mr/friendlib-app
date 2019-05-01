import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromBook from '../book.reducer';
import {Book} from '../book.reducer';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'book-details-page',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{(book$ | async)?.title}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-book-details [book]="book$ | async"></app-book-details>
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
}
