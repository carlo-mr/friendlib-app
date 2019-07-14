import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {DeviceRegistered} from '../auth/actions/auth.actions';
import {Push, PushObject, PushOptions} from '@ionic-native/push/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private push: Push,
              private alertCtrl: AlertController,
              private store: Store<any>) {

  }

  ngOnInit(): void {
    this.initPush();
  }

  async initPush() {
    const options: PushOptions = {
      android: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      },
      ios: {
        alert: 'true',
        badge: 'true',
        sound: 'true'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe(async (notification: any) => {
      this.alertCtrl.create({
        message: notification.message,
        buttons: ['Alles klar']
      })
        .then((alert) => alert.present())
        .catch(() => console.log('Alert could not be created.'));
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', JSON.stringify(registration));
      this.store.dispatch(new DeviceRegistered(registration));
    });

    pushObject.on('error').subscribe(error => {
      console.error('Error with Push plugin', error);
    });
  }
}
