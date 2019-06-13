import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromNotification from './notification.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NotificationEffects} from './notification.effects';
import {NotificationListComponent} from './components/notification-list/notification-list.component';
import {IonicModule} from '@ionic/angular';
import {BookDetailsModule} from '../book-details/book-details.module';

@NgModule({
  declarations: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    StoreModule.forFeature('notification', fromNotification.notificationReducer),
    EffectsModule.forFeature([NotificationEffects]),
    BookDetailsModule
  ],
  exports: [NotificationListComponent]
})
export class NotificationModule {
}
