import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfilePage} from './containers/profile.page';
import {IonicModule} from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {profileReducer} from './profile.reducer';
import {RandomAvatarChangeComponent} from './components/random-avatar-change/random-avatar-change.component';
import {AvataaarsModule} from '../avataaars/avataaars.module';
import {NotificationModule} from '../notification/notification.module';
import {SelectionAvatarChangeComponent} from './components/selection-avatar-change/selection-avatar-change.component';
import {AvatarChangeMenuPopoverComponent} from './components/avatar-change-menu-popover/avatar-change-menu-popover.component';

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
    RandomAvatarChangeComponent,
    SelectionAvatarChangeComponent,
    AvatarChangeMenuPopoverComponent
  ],
  entryComponents: [
    RandomAvatarChangeComponent,
    SelectionAvatarChangeComponent,
    AvatarChangeMenuPopoverComponent
  ]
})
export class ProfileModule {
}
