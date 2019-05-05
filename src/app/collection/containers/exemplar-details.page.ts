import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromCollection from '../reducers/collection.reducer';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AddBookToCollection, RemoveExemplar} from '../../collection/actions/collection.actions';
import {Book} from '../../common/book.model';
import {Collection, Exemplar} from '../../common/collection.model';
import {map} from 'rxjs/operators';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {LoggedUser} from '../../auth/models/auth.model';

@Component({
  selector: 'exemplar-details-page',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="Sammlung"></ion-back-button>
        </ion-buttons>
        <ion-title>{{(collection$ | async)?.ownerId}} Collection</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-book-details [book]="(exemplar$ | async)?.book"></app-book-details>

      <app-exemplar-links
        [exemplar]="exemplar$ | async"
        [user]="user$ | async"
        (removeExemplar)="onRemoveExemplar($event)"></app-exemplar-links>
    </ion-content>
  `
})
export class ExemplarDetailsPage implements OnInit {

  collection$: Observable<Collection>;
  exemplar$: Observable<Exemplar>;
  user$: Observable<LoggedUser>;

  constructor(private store: Store<fromCollection.CollectionState>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(fromAuth.getLoggedUser));

    const ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId');
    this.collection$ = this.store.pipe(select(fromCollection.selectEntity(ownerId)));

    const exemplarId = this.activatedRoute.snapshot.paramMap.get('exemplarId');
    this.exemplar$ = this.store.pipe(
      select(fromCollection.selectEntity(ownerId)),
      map((collection: Collection) => collection.exemplars.find((exemplar: Exemplar) => exemplar.exemplarId === exemplarId))
    );
  }

  onAddToCollection(book: Book) {
    this.store.dispatch(new AddBookToCollection({book}));
  }

  onRemoveExemplar(exemplar: Exemplar) {
    this.store.dispatch(new RemoveExemplar({exemplar}));
  }

}
