import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../actions/auth.actions';
import {LoginDetails} from '../models/auth.model';

@Component({
  selector: 'app-login-page',
  template: '<app-login (login)="onLogin($event)"></app-login>'
})
export class LoginPage implements OnInit {

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
  }

  onLogin(loginDetails: LoginDetails) {
    this.store.dispatch(new fromAuth.Login({loginDetails}));
  }

}
