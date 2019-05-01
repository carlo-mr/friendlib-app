import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as actions from '../book.actions';
import * as fromBook from '../book.reducer';
import {Book} from '../book.reducer';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'book-search-page',
  template: `
    <app-book-search (search)="onSearch($event)"></app-book-search>

    <ion-content>
      <app-book-grid
        [books]="books$ | async"
        (bookSelected)="onBookSelected($event)"></app-book-grid>
    </ion-content>
  `
})
export class BookSearchPage implements OnInit {

  books$: Observable<any>;

  constructor(private store: Store<fromBook.BookState>, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.books$ = this.store.pipe(select(fromBook.selectAll));
  }

  onSearch(searchTerm: string) {
    this.store.dispatch(new actions.SearchBooks(searchTerm));
  }

  onBookSelected(book: Book) {
    console.log('Navigating Book: ', book);

    this.navCtrl.navigateForward('/tabs/book/' + book.externalIdentifiers.gbooksId);
  }
}
