import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../actions/auth.actions';
import {LoginDetails} from '../models/auth.model';

@Component({
  selector: 'auth-login-page',
  styleUrls: ['login.page.scss'],
  template: `
    <ion-header>
      <img class="logo" src="./assets/img/splash-transparent.png"/>
    </ion-header>
    <ion-content padding>
      <auth-login (login)="onLogin($event)"></auth-login>
    </ion-content>
    <ion-footer>
      <ion-button fill="outline" routerLink="/register" routerDirection="forward">Registrieren</ion-button>
      <ion-button fill="outline" routerLink="/forgot" routerDirection="forward">Passwort vergessen</ion-button>
    </ion-footer>
  `
})
export class LoginPage {

  constructor(private store: Store<any>) {
  }

  onLogin(loginDetails: LoginDetails) {
    this.store.dispatch(new fromAuth.Login({loginDetails}));
  }

}
