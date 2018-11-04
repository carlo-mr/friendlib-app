import {Action} from '@ngrx/store';
import {LoggedUser, LoginDetails} from '../models/auth.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginError = '[Auth] Login Error'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: { loginDetails: LoginDetails }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { loggedUser: LoggedUser }) {
  }
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export type AuthActionsUnion =
  Login
  | LoginSuccess
  | LoginError;
