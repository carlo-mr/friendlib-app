import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as actions from '../book.actions';
import * as fromBook from '../book.reducer';
import {Observable} from 'rxjs';

@Component({
  selector: 'book-search-page',
  template: `
    <div *ngFor="let book of books$ | async">
      {{ book.title }}
    </div>
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

}
