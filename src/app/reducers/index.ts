import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAuth from '../auth/reducers/auth.reducer';
import * as fromBook from '../book/book.reducer';

export interface State {
  auth: fromAuth.AuthState;
  book: fromBook.BookState;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  book: fromBook.bookReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
