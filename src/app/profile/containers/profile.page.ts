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
import {AlertController, PopoverController} from '@ionic/angular';
import {AvatarChangeMenuPopoverComponent} from '../components/avatar-change-menu-popover/avatar-change-menu-popover.component';
import {RandomAvatarChangeComponent} from '../components/random-avatar-change/random-avatar-change.component';

@Component({
  selector: 'profile-page',
  styleUrls: ['profile.page.scss'],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="onAvatarClicked($event)">
            <ion-icon name="cog"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Profil</ion-title>

        <ion-buttons slot="end">
          <ion-button (click)="onLogoutClicked($event)">
            Ausloggen
            <ion-icon slot="end" name="exit"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="ion-text-center">
        <app-avatar class="avatar"
                    [user]="this.loggedUser$ | async"
                    (click)="onAvatarClicked($event)"></app-avatar>
      </div>

      <app-selection-avatar-change *ngIf="selectionAvatarChange" [user]="this.loggedUser$ | async"
                                   (change)="this.onAvatarChange($event)"></app-selection-avatar-change>

      <app-notification-list
        [loading]="notificationLoading$ | async"
        [notifications]="this.notifications$ | async"></app-notification-list>

    </ion-content>
  `
})
export class ProfilePage implements OnInit {

  avataaarsConfig: AvataaarsConfig;
  changeAvatar: boolean;
  notifications$: Observable<Notification[]>;
  notificationLoading$: Observable<boolean>;

  selectionAvatarChange = false;

  loggedUser$: Observable<LoggedUser>;
  private user: LoggedUser;

  constructor(public store: Store<fromProfile.ProfileState>,
              private alertController: AlertController,
              private popoverCtrl: PopoverController) {

    this.loggedUser$ = store.pipe(select(getLoggedUser));
    this.loggedUser$.subscribe((user) => this.user = user);

    this.notifications$ = store.pipe(select(fromNotification.selectAll));
    this.notificationLoading$ = store.pipe(select(fromNotification.getNotificationLoading));
    this.store.dispatch(new LoadNotifications({}));
  }

  ngOnInit() {

  }

  doRefresh(event) {
    this.store.dispatch(new LoadNotifications({refresher: event.target}));
  }

  onAvatarChange(event) {
    this.store.dispatch(new ChangeAvatar({avatar: event.avatar}));
    this.selectionAvatarChange = false;
  }

  async onLogoutClicked(event) {
    const alert = await this.alertController.create({
      header: `Ausloggen`,
      message: 'Möchtest du dich ausloggen?',
      buttons: [{
        text: 'Ja',
        handler: () => {
          this.store.dispatch(new Logout({}));
        }
      }, {
        text: 'Nee quatsch',
        role: 'cancel'
      }],
    });

    await alert.present();
  }

  onAvatarClicked(event) {
    if (!this.selectionAvatarChange) {
      this.presentAvatarChangeMenuPopover(event);
    }
  }

  async presentAvatarChangeMenuPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: AvatarChangeMenuPopoverComponent,
      keyboardClose: true,
      event: event,
      translucent: true
    });

    popover.onDidDismiss().then((result) => {
      if (result && result.data && result.data.type) {
        this.presentAvatarChangePopover(result.data.type);
      }
    });

    return await popover.present();
  }

  async presentAvatarChangePopover(type) {
    if (type === 'selection') {
      this.selectionAvatarChange = true;
    } else {
      const popover = await this.popoverCtrl.create({
        component: RandomAvatarChangeComponent,
        componentProps: {
          user: this.user
        },
        keyboardClose: true,
        translucent: false
      });

      popover.onDidDismiss().then((result) => {
        if (result && result.data && result.data.avatar) {
          this.store.dispatch(new ChangeAvatar({avatar: result.data.avatar}));
        }
      });

      return await popover.present();
    }
  }

}
