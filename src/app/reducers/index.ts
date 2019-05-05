import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAuth from '../auth/reducers/auth.reducer';
import * as fromBook from '../book/book.reducer';
import * as fromCollection from '../collection/reducers/collection.reducer';

export interface State {
  auth: fromAuth.AuthState;
  book: fromBook.BookState;
  collection: fromCollection.CollectionState;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  book: fromBook.bookReducer,
  collection: fromCollection.collectionReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
