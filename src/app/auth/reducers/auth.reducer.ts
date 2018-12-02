import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';
import {LoggedUser} from '../models/auth.model';

export interface AuthState {
  isLoggedIn: boolean;
  loggedUser?: LoggedUser;
}

export const initialState: AuthState = {
  isLoggedIn: false
};

export function reducer(state = initialState, action: AuthActionsUnion): AuthState {
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

    default:
      return state;
  }
}
