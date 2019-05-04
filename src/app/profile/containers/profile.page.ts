import {Component, OnInit} from '@angular/core';
import {AvataaarsConfig} from '../../avataaars/components/avataaars-wrapper/avataaars-wrapper.component';
import {Store} from '@ngrx/store';
import * as fromProfile from '../profile.reducer';
import {getLoggedUser} from '../../auth/reducers/auth.reducer';
import {Observable} from 'rxjs';
import {LoggedUser} from '../../auth/models/auth.model';
import {ChangeAvatar, Logout} from '../../auth/actions/auth.actions';

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
      <div class="ion-text-center">
        <app-avatar-change [user]="this.loggedUser$ | async"
                           (change)="onAvatarChange($event)"></app-avatar-change>
      </div>
    </ion-content>
  `
})
export class ProfilePage implements OnInit {

  avataaarsConfig: AvataaarsConfig;
  dirty: boolean;

  loggedUser$: Observable<LoggedUser>;

  constructor(public store: Store<fromProfile.ProfileState>) {

    this.loggedUser$ = store.select(getLoggedUser);
  }

  ngOnInit() {

  }

  onAvatarChange(avatar) {
    this.store.dispatch(new ChangeAvatar({avatar}));
  }

  onLogoutClicked(event) {
    this.store.dispatch(new Logout({}));
  }

}
