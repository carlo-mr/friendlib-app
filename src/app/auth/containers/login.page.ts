import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../actions/auth.actions';
import {LoginDetails} from '../models/auth.model';

@Component({
  selector: 'auth-login-page',
  styleUrls: ['auth.page.scss'],
  template: `
    <ion-header>
      <img class="logo" src="./assets/img/splash-transparent.png"/>
    </ion-header>

    <ion-content padding>
      <auth-login (login)="onLogin($event)"></auth-login>
    </ion-content>

    <ion-footer>
      <ion-grid>
        <ion-row>
          <ion-col col-6>
            <ion-button expand="full" routerLink="/register" routerDirection="forward" color="secondary">Registrieren</ion-button>
          </ion-col>
          <ion-col col-6>
            <ion-button expand="full" routerLink="/forgot" routerDirection="forward" color="secondary">Passwort vergessen</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
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
