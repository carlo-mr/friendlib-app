import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as actions from '../actions/auth.actions';
import * as fromAuth from '../reducers/auth.reducer';
import {Observable} from 'rxjs';
import {NewPasswordDetails} from '../models/auth.model';

@Component({
  selector: 'auth-forgotpassword-page',
  styleUrls: ['auth.page.scss'],
  template: `
    <ion-header text-center>
      <img class="logo" src="./assets/img/splash-transparent.png"/>
    </ion-header>

    <ion-content padding>
      <auth-forgotpassword
        [forgotPasswordCodeSent]="forgotPasswordCodeSent$ | async"
        (newPassword)="onNewPassword($event)"
        (requestCode)="onRequestCode($event)">
      </auth-forgotpassword>
    </ion-content>

    <ion-footer>
      <ion-grid>
        <ion-row>
          <ion-col col-12>
            <ion-button expand="full" routerLink="/" routerDirection="forward" color="secondary">Einloggen</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
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
