import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';
import {LoggedUser} from '../../auth/models/auth.model';
import * as fromCollection from '../../collection/reducers/collection.reducer';
import {ActivatedRoute} from '@angular/router';
import {Collection, Exemplar} from '../../common/collection.model';
import {LoadCollection} from '../actions/collection.actions';

@Component({
  selector: 'collection-details-page',
  styles: [`.avatar-small {
    width: 40px;
    height: 40px;
  }`],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <app-avatar class="avatar-small"
                      [user]="this.user$ | async"
                      (click)="onAvatarClicked($event)"></app-avatar>
        </ion-buttons>
        <ion-title>Sammlung</ion-title>
        <ion-buttons slot="end">
          <ion-button icon-only (click)="onAddClicked($event)">
            <ion-icon name="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-exemplar-grid [exemplars]="(this.collection$ | async)?.exemplars"
                         (exemplarSelected)="onExemplarSelected($event)"></app-exemplar-grid>
    </ion-content>
  `
})
export class CollectionDetailsPage implements OnInit {

  collection$: Observable<Collection>;
  user$: Observable<LoggedUser>;

  constructor(private store: Store<fromCollection.CollectionState>,
              private navCtrl: NavController,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId');

    if (ownerId) {
      this.collection$ = this.store.pipe(select(fromCollection.selectEntity(ownerId)));
    } else {
      this.collection$ = this.store.pipe(select(fromCollection.loggedInUserCollection));
      this.store.dispatch(new LoadCollection());
    }

    this.user$ = this.store.pipe(select(fromAuth.getLoggedUser));

  }

  onAvatarClicked(event) {
    this.navCtrl.navigateRoot('/app/profile');
  }

  onExemplarSelected(exemplar: Exemplar) {
    this.navCtrl.navigateForward(`/app/collection/${exemplar.ownerId}/${exemplar.exemplarId}`);
  }

  onAddClicked(event) {
    this.navCtrl.navigateForward('/app/book');
  }
}
