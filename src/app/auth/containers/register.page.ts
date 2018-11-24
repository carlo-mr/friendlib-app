import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../actions/auth.actions';
import {RegisterDetails} from '../models/auth.model';

@Component({
  selector: 'auth-register-page',
  template: `
    <auth-register (register)="onRegister($event)"></auth-register>

    <ion-button fill="outline" routerLink="/" routerDirection="forward">Einloggen</ion-button>
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
