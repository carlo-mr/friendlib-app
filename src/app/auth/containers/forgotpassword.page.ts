import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as actions from '../actions/auth.actions';
import * as fromAuth from '../reducers/auth.reducer';
import {Observable} from 'rxjs';
import {NewPasswordDetails} from '../models/auth.model';

@Component({
  selector: 'auth-forgotpassword-page',
  template: `
    <ion-content padding>
      <auth-forgotpassword
        [forgotPasswordCodeSent]="forgotPasswordCodeSent$ | async"
        (newPassword)="onNewPassword($event)"
        (requestCode)="onRequestCode($event)">
      </auth-forgotpassword>

      <ion-button fill="outline" routerLink="/" routerDirection="forward">Einloggen</ion-button>
    </ion-content>
  `
})
export class ForgotpasswordPage implements OnInit {
  forgotPasswordCodeSent$: Observable<boolean>;

  constructor(private store: Store<fromAuth.AuthState>) {
    this.forgotPasswordCodeSent$ = this.store.pipe(
      select(fromAuth.getForgotPasswordCodeSent)
    );
  }

  ngOnInit() {
  }

  onRequestCode(userName: string) {
    this.store.dispatch(new actions.ForgotPassword({userName}));
  }

  onNewPassword(newPasswordDetails: NewPasswordDetails) {
    this.store.dispatch(new actions.NewPassword({newPasswordDetails}));
  }

}
