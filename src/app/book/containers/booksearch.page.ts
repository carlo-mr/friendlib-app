import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as actions from '../book.actions';
import * as fromBook from '../book.reducer';
import {Observable} from 'rxjs';

@Component({
  selector: 'book-search-page',
  template: `
    <app-book-search (search)="onSearch($event)"></app-book-search>

    <ul>
      <li *ngFor="let book of books$ | async">{{book.title}}</li>
    </ul>
  `
})
export class BookSearchPage implements OnInit {
  books$: Observable<any>;

  constructor(private store: Store<fromBook.BookState>) {
  }

  ngOnInit() {
    this.books$ = this.store.pipe(select(fromBook.selectAll));
    this.store.dispatch(new actions.SearchBooks('Harry'));
  }

  onSearch(searchTerm: string) {
    this.store.dispatch(new actions.SearchBooks(searchTerm));
  }

}
