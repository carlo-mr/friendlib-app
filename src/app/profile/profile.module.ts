import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfilePage} from './containers/profile.page';
import {IonicModule} from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {profileReducer} from './profile.reducer';
import {AvatarChangeComponent} from './components/avatar-change/avatar-change.component';
import {AvataaarsModule} from '../avataaars/avataaars.module';
import {NotificationModule} from '../notification/notification.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('profile', profileReducer),
    AvataaarsModule,
    NotificationModule
  ],
  declarations: [
    ProfilePage,
    AvatarChangeComponent
  ]
})
export class ProfileModule {
}
