import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {StoreModule} from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';
import {LoginComponent} from './components/login/login.component';
import {LoginPage} from './containers/login.page';
import {RegisterPage} from './containers/register.page';
import {RegisterComponent} from './components/register/register.component';
import {ForgotpasswordPage} from './containers/forgotpassword.page';
import {ForgotpasswordComponent} from './components/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'forgot',
    component: ForgotpasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginPage, LoginComponent, RegisterPage, RegisterComponent, ForgotpasswordPage, ForgotpasswordComponent]
})
export class AuthModule {
}
