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
  forgotPasswordCodeSent: false
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

    default:
      return state;
  }
}

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getForgotPasswordCodeSent = createSelector(getAuthState, (state: AuthState) => state.forgotPasswordCodeSent);
