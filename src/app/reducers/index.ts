import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAuth from '../auth/reducers/auth.reducer';

export interface State {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
