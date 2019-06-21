import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';
import {LoggedUser} from '../../auth/models/auth.model';
import * as fromCollection from '../../collection/reducers/collection.reducer';
import * as fromExemplar from '../../exemplar/exemplar.reducer';
import * as fromBook from '../../book/book.reducer';
import * as fromBorrowing from '../../borrowing/borrowing.reducer';
import {ActivatedRoute} from '@angular/router';
import {Collection} from '../../common/collection.model';
import {LoadCollection} from '../actions/collection.actions';
import * as fromUser from '../../user/user.reducer';
import {Dictionary} from '@ngrx/entity';
import {User} from '../../user/user.model';
import {Exemplar} from '../../common/exemplar.model';
import {Book} from '../../common/book.model';
import {Borrowing} from '../../common/borrowing.model';

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
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-segment padding (ionChange)="segmentChanged($event)">
        <ion-segment-button [checked]="segment == 'own'" value="own">
          <ion-label>Deine Bücher</ion-label>
        </ion-segment-button>
        <ion-segment-button [checked]="segment == 'borrowed'" value="borrowed">
          <ion-label>Geliehene Bücher</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ng-container *ngIf="segment == 'own'">
        <app-exemplar-grid [exemplars]="exemplars$ | async"
                           [users]="users$ | async"
                           [books]="books$ | async"
                           [borrowings]="borrowings$ | async"
                           [type]="segment"
                           (exemplarSelected)="onExemplarSelected($event)"></app-exemplar-grid>

        <ng-container *ngIf="(exemplars$ | async)?.length == 0">
          <div class="ion-text-center">
            <h2>Noch keine Bücher</h2>
            <p>Nutze das '+' Symbol oben rechts um Bücher hinzuzufügen.</p>
            <img src="../../assets/img/empty_shelf.jpg"/>
          </div>
        </ng-container>

      </ng-container>

      <ng-container *ngIf="segment == 'borrowed'">
        <app-exemplar-grid [exemplars]="borrowedExemplars$ | async"
                           [users]="users$ | async"
                           [books]="books$ | async"
                           [type]="segment"
                           (exemplarSelected)="onExemplarSelected($event)"></app-exemplar-grid>

        <ng-container *ngIf="(this.collection$ | async)?.borrowedExemplars.length == 0">
          <div class="ion-text-center">
            <h2>Aktuell hast du dir keine Bücher ausgeliehen</h2>
            <p>Nutze die Suche um Bücher zu finden und zu sehen, wer sie dir ausleihen könnte.</p>
            <img src="../../assets/img/empty_shelf.jpg"/>
          </div>
        </ng-container>
      </ng-container>
    </ion-content>
  `
})
export class CollectionDetailsPage implements OnInit {

  view = 'cards';
  sort = 'titleAsc';
  filterValue = '';

  collection$: Observable<Collection>;
  user$: Observable<LoggedUser>;
  users$: Observable<Dictionary<User>>;
  books$: Observable<Book[]>;
  borrowings$: Observable<Borrowing[]>;

  // select based on collection
  exemplars$: Observable<Exemplar[]>;
  borrowedExemplars$: Observable<Exemplar[]>;

  segment = 'own';

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

    // TODO can this be rewritten using a selector?
    // e.g. dispatch selectedCollection action
    this.collection$.subscribe((collection: Collection) => {
      if (collection) {
        console.log('collection$ subscription: ', collection);
        this.exemplars$ = this.store.pipe(select(fromExemplar.selectEntityList(collection.exemplars)));
        this.borrowedExemplars$ = this.store.pipe(select(fromExemplar.selectEntityList(collection.borrowedExemplars)));
      }
    });

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // TODO put into the store
      this.segment = queryParams['segment'] || 'own';
    });

    this.user$ = this.store.pipe(select(fromAuth.getLoggedUser));
    this.users$ = this.store.pipe(select(fromUser.selectEntities));
    this.books$ = this.store.pipe(select(fromBook.selectAll));
    this.borrowings$ = this.store.pipe(select(fromBorrowing.selectAll));
  }

  doRefresh(event) {
    const ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId');

    if (ownerId) {
      this.store.dispatch(new LoadCollection({ownerId: ownerId, refresher: event.target}));
    } else {
      this.store.dispatch(new LoadCollection({refresher: event.target}));
    }
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
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
