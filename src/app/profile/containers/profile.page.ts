import {Component, OnInit} from '@angular/core';
import {AvataaarsConfig} from '../../avataaars/components/avataaars-wrapper/avataaars-wrapper.component';
import {select, Store} from '@ngrx/store';
import * as fromProfile from '../profile.reducer';
import * as fromNotification from '../../notification/notification.reducer';
import {Notification} from '../../notification/notification.model';
import {getLoggedUser} from '../../auth/reducers/auth.reducer';
import {Observable} from 'rxjs';
import {LoggedUser} from '../../auth/models/auth.model';
import {ChangeAvatar, Logout} from '../../auth/actions/auth.actions';
import {LoadNotifications} from '../../notification/notification.actions';

@Component({
  selector: 'profile-page',
  styleUrls: ['profile.page.scss'],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Profil</ion-title>

        <ion-buttons slot="end">
          <ion-button icon-only (click)="onLogoutClicked($event)">
            <ion-icon name="exit"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="ion-text-center">
        <app-avatar-change [user]="this.loggedUser$ | async"
                           (change)="onAvatarChange($event)"></app-avatar-change>
      </div>

      <app-notification-list
        [notifications]="this.notifcations$ | async"></app-notification-list>

    </ion-content>
  `
})
export class ProfilePage implements OnInit {

  avataaarsConfig: AvataaarsConfig;
  dirty: boolean;
  notifcations$: Observable<Notification[]>;

  loggedUser$: Observable<LoggedUser>;

  constructor(public store: Store<fromProfile.ProfileState>) {

    this.loggedUser$ = store.pipe(select(getLoggedUser));
    this.notifcations$ = store.pipe(select(fromNotification.selectAll));

    this.store.dispatch(new LoadNotifications({}));
  }

  ngOnInit() {

  }

  doRefresh(event) {
    this.store.dispatch(new LoadNotifications({refresher: event.target}));
  }

  onAvatarChange(avatar) {
    this.store.dispatch(new ChangeAvatar({avatar}));
  }

  onLogoutClicked(event) {
    this.store.dispatch(new Logout({}));
  }

}
