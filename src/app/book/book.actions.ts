import {Action} from '@ngrx/store';
import {Book} from '../common/book.model';

export enum BookActionTypes {
  SearchBooks = '[Book] Search books',
  SearchBooksSuccess = '[Book] Search books success',
  SearchBooksError = '[Book] Search books error',

  LoadBooksSuccess = '[Book] Load books success',

  LoadBookSuccess = '[Book] Load Book success'
}

export class SearchBooks implements Action {
  readonly type = BookActionTypes.SearchBooks;

  constructor(public searchTerm: string) {
  }
}

export class SearchBooksSuccess implements Action {
  readonly type = BookActionTypes.SearchBooksSuccess;

  constructor(public books: Book[]) {
  }
}

export class SearchBookError implements Action {
  readonly type = BookActionTypes.SearchBooksError;

  constructor(public errorMessage: string) {
  }
}

export class LoadBooksSuccess implements Action {
  readonly type = BookActionTypes.LoadBooksSuccess;

  constructor(public books: Book[]) {
  }
}

export class LoadBookSuccess implements Action {
  readonly type = BookActionTypes.LoadBookSuccess;

  constructor(public book: Book) {
  }
}

export type BookActions =
  SearchBooks
  | SearchBooksSuccess
  | SearchBookError
  | LoadBooksSuccess
  | LoadBookSuccess;
