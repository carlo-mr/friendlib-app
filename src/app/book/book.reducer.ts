import {BookActions, BookActionTypes} from './book.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Book} from '../common/book.model';

export const bookAdapter = createEntityAdapter<Book>({
  selectId: (book: Book) => book.externalIdentifiers.gbooksId,
  sortComparer: sortByOwners
});

export interface BookState extends EntityState<Book> {
}

const defaultState = {};

export const initialState: BookState = bookAdapter.getInitialState(defaultState);

export function bookReducer(state: BookState = initialState, action: BookActions) {

  switch (action.type) {
    case BookActionTypes.SearchBooksSuccess:
      return bookAdapter.addAll(action.books, state);

    case BookActionTypes.LoadBookSuccess:
      return bookAdapter.addOne(action.book, state);
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

export const selectEntity = id => createSelector(
  selectEntities,
  entities => entities[id]
);

export function sortByOwners(a: Book, b: Book): number {
  const aOwners = a.owners ? a.owners : [];
  const bOwners = b.owners ? b.owners : [];

  if (aOwners.length < bOwners.length) {
    return 1;
  } else if (aOwners.length > bOwners.length) {
    return -1;
  }
  return 0;
}
