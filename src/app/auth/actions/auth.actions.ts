import {Action} from '@ngrx/store';
import {LoggedUser, LoginDetails, RegisterDetails} from '../models/auth.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginError = '[Auth] Login Error',

  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterError = '[Auth] Register Error'
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

export class Register implements Action {
  readonly type = AuthActionTypes.Register;

  constructor(public payload: { registerDetails: RegisterDetails }) {
  }
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;

  constructor(public payload: { cognitoUser: any }) {
  }
}

export class RegisterError implements Action {
  readonly type = AuthActionTypes.RegisterError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export type AuthActionsUnion =
  Login
  | LoginSuccess
  | LoginError
  | Register
  | RegisterSuccess
  | RegisterError;
