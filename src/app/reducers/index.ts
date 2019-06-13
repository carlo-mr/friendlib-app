import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAuth from '../auth/reducers/auth.reducer';
import * as fromBook from '../book/book.reducer';
import * as fromBorrowing from '../borrowing/borrowing.reducer';
import * as fromCollection from '../collection/reducers/collection.reducer';
import * as fromUser from '../user/user.reducer';
import * as fromNotification from '../notification/notification.reducer';

export interface State {
  auth: fromAuth.AuthState;
  book: fromBook.BookState;
  collection: fromCollection.CollectionState;
  borrowing: fromBorrowing.BorrowingState;
  user: fromUser.UserState;
  notification: fromNotification.NotificationState;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  book: fromBook.bookReducer,
  collection: fromCollection.collectionReducer,
  borrowing: fromBorrowing.borrowingReducer,
  user: fromUser.userReducer,
  notification: fromNotification.notificationReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
