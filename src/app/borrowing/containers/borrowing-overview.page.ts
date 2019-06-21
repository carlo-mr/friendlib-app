import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';
import {LoggedUser} from '../../auth/models/auth.model';
import * as fromUser from '../../user/user.reducer';
import {ActivatedRoute} from '@angular/router';
import {Borrowing} from '../../common/borrowing.model';
import {User} from '../../user/user.model';
import {Dictionary} from '@ngrx/entity';
import * as fromBorrowing from '../../borrowing/borrowing.reducer';
import {LoadCollection} from '../../collection/actions/collection.actions';

@Component({
  selector: 'borrowing-overview-page',
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
        <ion-title>Leihen</ion-title>
        <ion-buttons slot="end">

        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <app-borrowing-list [title]="'Offene Anfragen'"
                          [borrowings]="openBorrowings$ | async"
                          [users]="users$ | async"
                          (selectExemplar)="onSelectExemplar($event)">
      </app-borrowing-list>

      <app-borrowing-list [title]="'Akzeptierte Anfragen'"
                          [borrowings]="acceptedBorrowings$ | async"
                          [users]="users$ | async"
                          (selectExemplar)="onSelectExemplar($event)">
      </app-borrowing-list>

      <div>
        <ion-item-divider>
          <ion-label>
            Geliehene Bücher
          </ion-label>
        </ion-item-divider>
        <p class="ion-text-center">
          Bücher, die du dir ausgeliehen hast findest du <a (click)="onGoToCollection($event)">in deiner Sammlung.</a>
        </p>
      </div>

      <div *ngIf="(openBorrowings$ | async)?.length == 0" class="ion-text-center">
        <h2>Keine Leihen</h2>
        <p>Aktuell hast du keine offenen Leihanfragen.</p>
        <p>Nutze die Suche, um Bücher zu finden und um zu sehen, wer sie dir ausleihen könnte.</p>
        <p>Bücher, die du dir ausgeliehen hast findest du <a (click)="onGoToCollection($event)">in deiner Sammlung.</a></p>
        <img src="../../assets/img/empty_borrowings.jpg"/>
      </div>
    </ion-content>
  `
})
export class BorrowingOverviewPage implements OnInit {

  user$: Observable<LoggedUser>;
  openBorrowings$: Observable<Borrowing[]>;
  acceptedBorrowings$: Observable<Borrowing[]>;
  receivedBorrowings$: Observable<Borrowing[]>;
  users$: Observable<Dictionary<User>>;

  constructor(private store: Store<any>,
              private navCtrl: NavController,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(fromAuth.getLoggedUser));
    this.openBorrowings$ = this.store.pipe(select(fromBorrowing.getBorrowingsOfLoggedInUser('OPEN')));
    this.acceptedBorrowings$ = this.store.pipe(select(fromBorrowing.getBorrowingsOfLoggedInUser('ACCEPTED')));
    this.users$ = this.store.pipe(select(fromUser.selectEntities));
  }

  doRefresh(event) {
    this.store.dispatch(new LoadCollection({refresher: event.target}));
  }

  onAvatarClicked(event) {
    this.navCtrl.navigateRoot('/app/profile');
  }

  onSelectExemplar(event) {
    this.navCtrl.navigateForward(`/app/collection/${event.ownerId}/${event.exemplarId}`);
  }

  onGoToCollection(event) {
    // TODO find out why query params in navigation options do not work
    this.navCtrl.navigateRoot(`/app/collection?segment=borrowed`);
  }

}
