import {BookActions, BookActionTypes} from './book.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';

export interface Book {
  id: string;
  title: string;
  description: string;

  coverUrl: string;
  productUrl: string;

  authors: string[];

  binding: string;
  pages: number;

  alternatives?: Book[];
}

export const bookAdapter = createEntityAdapter<Book>();

export interface BookState extends EntityState<Book> {
}

const defaultState = {
  ids: [],
  entities: {}
};

export const initialState: BookState = bookAdapter.getInitialState(defaultState);


export function bookReducer(state: BookState = initialState, action: BookActions) {

  switch (action.type) {
    case BookActionTypes.SearchBooksSuccess:
      return bookAdapter.addAll(action.books, state);
    default:
      return state;
  }

}

export const getBookState = createFeatureSelector<BookState>('book');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = bookAdapter.getSelectors(getBookState);
