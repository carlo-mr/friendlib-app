import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../actions/auth.actions';
import {LoginDetails} from '../models/auth.model';

@Component({
  selector: 'auth-login-page',
  template: `
    <auth-login (login)="onLogin($event)"></auth-login>
    <ion-button fill="outline" routerLink="/register" routerDirection="forward">Registrieren</ion-button>
  `
})
export class LoginPage {

  constructor(private store: Store<any>) {
  }

  onLogin(loginDetails: LoginDetails) {
    this.store.dispatch(new fromAuth.Login({loginDetails}));
  }

}
