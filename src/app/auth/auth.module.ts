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

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginPage, LoginComponent]
})
export class AuthModule {
}
