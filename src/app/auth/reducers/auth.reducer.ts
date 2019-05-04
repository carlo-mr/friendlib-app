import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';
import {LoggedUser} from '../models/auth.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface AuthState {
  isLoggedIn: boolean;
  loggedUser?: LoggedUser;
  forgotPasswordCodeSent?: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  forgotPasswordCodeSent: false,
  loggedUser: null
};

export function authReducer(state = initialState, action: AuthActionsUnion): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        isLoggedIn: true,
        loggedUser: action.payload.loggedUser
      };

    case AuthActionTypes.LogoutSuccess:
      return {
        ...state,
        isLoggedIn: false,
        loggedUser: null
      };

    case AuthActionTypes.ForgotPasswordSuccess:
      return {
        ...state,
        forgotPasswordCodeSent: true
      };

    case AuthActionTypes.ChangeAvatarSuccess:
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          avatar: action.payload.avatar
        }
      };

    default:
      return state;
  }
}

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const isLoggedIn = createSelector(getAuthState, (state: AuthState) => state.isLoggedIn);
export const getForgotPasswordCodeSent = createSelector(getAuthState, (state: AuthState) => state.forgotPasswordCodeSent);
export const getLoggedUser = createSelector(getAuthState, (state: AuthState) => state.loggedUser);
export const getIdToken = createSelector(getLoggedUser,
  (user: LoggedUser) => user ? user.session ? user.session.idToken : null : null);

