import {Action} from '@ngrx/store';
import {LoggedUser, LoginDetails, NewPasswordDetails, RegisterDetails} from '../models/auth.model';

export enum AuthActionTypes {
  LoginLocalStorage = '[Auth] Login Local Storage',
  LoginLocalStorageSuccess = '[Auth] Login Local Storage Success',
  LoginLocalStorageError = '[Auth] Login Local Storage Error',

  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginError = '[Auth] Login Error',

  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterError = '[Auth] Register Error',

  ForgotPassword = '[Auth] ForgotPassword',
  ForgotPasswordSuccess = '[Auth] ForgotPassword Success',
  ForgotPasswordError = '[Auth] ForgotPassword Error',

  NewPassword = '[Auth] NewPassword',
  NewPasswordSuccess = '[Auth] NewPassword Success',
  NewPasswordError = '[Auth] NewPassword Error',

  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutError = '[Auth] Logout Error'
}

export class LoginLocalStorage implements Action {
  readonly type = AuthActionTypes.LoginLocalStorage;

  constructor() {
  }
}

export class LoginLocalStorageSuccess implements Action {
  readonly type = AuthActionTypes.LoginLocalStorageSuccess;

  constructor(public loggedUser: LoggedUser) {
  }
}

export class LoginLocalStorageError implements Action {
  readonly type = AuthActionTypes.LoginLocalStorageError;

  constructor(public errorMessage: string) {
  }
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

export class ForgotPassword implements Action {
  readonly type = AuthActionTypes.ForgotPassword;

  constructor(public payload: { userName: string }) {
  }
}

export class ForgotPasswordSuccess implements Action {
  readonly type = AuthActionTypes.ForgotPasswordSuccess;

  constructor(public payload: { destination: string }) {
  }
}

export class ForgotPasswordError implements Action {
  readonly type = AuthActionTypes.ForgotPasswordError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class NewPassword implements Action {
  readonly type = AuthActionTypes.NewPassword;

  constructor(public payload: { newPasswordDetails: NewPasswordDetails }) {
  }
}

export class NewPasswordSuccess implements Action {
  readonly type = AuthActionTypes.NewPasswordSuccess;

  constructor() {
  }
}

export class NewPasswordError implements Action {
  readonly type = AuthActionTypes.NewPasswordError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;

  constructor(public payload: { loggedUser?: LoggedUser }) {
  }
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;

  constructor() {
  }
}

export class LogoutError implements Action {
  readonly type = AuthActionTypes.LogoutError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export type AuthActionsUnion =
  LoginLocalStorage
  | LoginLocalStorageSuccess
  | LoginLocalStorageError
  | Login
  | LoginSuccess
  | LoginError
  | Register
  | RegisterSuccess
  | RegisterError
  | ForgotPassword
  | ForgotPasswordSuccess
  | ForgotPasswordError
  | NewPassword
  | NewPasswordSuccess
  | NewPasswordError
  | Logout
  | LogoutSuccess
  | LogoutError;
