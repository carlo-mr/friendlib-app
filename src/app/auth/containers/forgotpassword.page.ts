import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../actions/auth.actions';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'auth-forgotpassword-page',
  template: `
    <auth-forgotpassword
      [forgotPasswordCodeSent]="forgotPasswordCodeSent$ | async"
      (newPassword)="onNewPassword($event)"
      (submit)="onSubmit($event)">
    </auth-forgotpassword>

    <ion-button fill="outline" routerLink="/" routerDirection="forward">Einloggen</ion-button>
  `
})
export class ForgotpasswordPage implements OnInit {
  forgotPasswordCodeSent$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.forgotPasswordCodeSent$ = this.store.pipe(
      select(state => state.auth),
      map(state => state.forgotPasswordCodeSent)
    );
  }

  ngOnInit() {
  }

  onNewPassword(userName: string) {
    this.store.dispatch(new fromAuth.ForgotPassword({userName}));
  }

  onSubmit() {

  }

}
