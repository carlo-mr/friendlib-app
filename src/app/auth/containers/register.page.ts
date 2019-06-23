import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../actions/auth.actions';
import {RegisterDetails} from '../models/auth.model';

@Component({
  selector: 'auth-register-page',
  styleUrls: ['auth.page.scss'],
  template: `
    <ion-header text-center>
      <img class="logo" src="./assets/img/splash-transparent.png"/>
    </ion-header>

    <ion-content padding>
      <auth-register (register)="onRegister($event)"></auth-register>
    </ion-content>

    <ion-footer>
      <ion-grid>
        <ion-row>
          <ion-col col-6>
            <ion-button expand="full" routerLink="/" routerDirection="forward" color="secondary">Einloggen</ion-button>
          </ion-col>
          <ion-col col-6>
            <ion-button expand="full" routerLink="/forgot" routerDirection="forward" color="secondary">Neues Passwort</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  `
})
export class RegisterPage implements OnInit {
  constructor(private store: Store<any>) {
  }

  ngOnInit() {
  }

  onRegister(registerDetails: RegisterDetails) {
    this.store.dispatch(new fromAuth.Register({registerDetails}));
  }

}
