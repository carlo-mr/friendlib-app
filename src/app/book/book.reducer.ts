import {BookActions, BookActionTypes} from './book.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Book} from '../common/book.model';

export const bookAdapter = createEntityAdapter<Book>({
  // non persisted books do not have a bookid therefore currently the gbooksid is used as id in the store
  selectId: (book: Book) => book.externalIdentifiers.gbooksId
});

export interface BookState extends EntityState<Book> {
  searchIds: string[];
  searchTerm: string;
}

const defaultState = {
  searchIds: [],
  searchTerm: ''
};

export const initialState: BookState = bookAdapter.getInitialState(defaultState);

export function bookReducer(state: BookState = initialState, action: BookActions) {

  switch (action.type) {
    case BookActionTypes.SearchBooks:
      const searchTerm = action.searchTerm;

      if (searchTerm === '') {
        return {
          ...state,
          searchIds: [],
          searchTerm
        };
      }

      return {
        ...state,
        searchTerm
      };

    case BookActionTypes.SearchBooksSuccess:
      return bookAdapter.upsertMany(
        action.books,
        {
          ...state,
          searchIds: action.books.map((book: Book) => book.externalIdentifiers.gbooksId),
          searchTerm: state.searchTerm
        });

    case BookActionTypes.LoadBookSuccess:
      return bookAdapter.upsertOne(action.book, state);

    case BookActionTypes.LoadBooksSuccess:
      return bookAdapter.upsertMany(action.books, state);
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

export const selectByBookId = bookId => createSelector(
  selectAll,
  (books: Book[]) => books.find((book: Book) => book.bookId === bookId)
);

export const getSearchBookIds = createSelector(getBookState, (state: BookState) => state.searchIds);
export const getSearchTerm = createSelector(getBookState, (state: BookState) => state.searchTerm);

export const getSearchResults = createSelector(
  selectEntities,
  getSearchBookIds,
  (entities, searchIds) => {
    if (searchIds) {
      const books = searchIds.map(id => entities[id]);
      return books.sort(sortByOwners);
    }
    return [];
  });

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
