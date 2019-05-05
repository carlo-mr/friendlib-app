import {Action} from '@ngrx/store';
import {Book} from '../common/book.model';

export enum BookActionTypes {
  SearchBooks = '[Book] Search books',
  SearchBooksSuccess = '[Book] Search books success',
  SearchBooksError = '[Book] Search books error',

  LoadBook = '[Book] Load Book'
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

export class LoadBook implements Action {
  readonly type = BookActionTypes.LoadBook;

  constructor(public book: Book) {
  }
}

export type BookActions =
  SearchBooks
  | SearchBooksSuccess
  | SearchBookError
  | LoadBook;
