import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  AddBookToCollection,
  AddBookToCollectionError,
  AddBookToCollectionSuccess,
  CollectionActions,
  CollectionActionTypes,
  LoadCollection,
  LoadCollectionError,
  LoadCollectionSuccess,
  RemoveExemplar,
  RemoveExemplarError,
  RemoveExemplarSuccess
} from '../actions/collection.actions';
import {CollectionService} from '../collection.service';
import {Collection} from '../../common/collection.model';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {Exemplar} from '../../common/exemplar.model';
import {normalize} from 'normalizr';
import {SearchBooksSuccess} from '../../book/book.actions';
import {LoadBorrowingsSuccess} from '../../borrowing/borrowing.actions';
import {CollectionSchema} from '../../common/friendlib.schema';
import {LoadExemplarsSuccess} from '../../exemplar/exemplar.actions';

@Injectable()
export class CollectionEffects {

  @Effect()
  loadCollection$ = this.actions$.pipe(
    ofType(CollectionActionTypes.LoadCollection),
    switchMap((action: LoadCollection) => {
      let ownerId;
      if (action.payload && action.payload.ownerId) {
        ownerId = action.payload.ownerId;
      }

      return this.collectionService.loadCollection(ownerId).pipe(
        tap(() => action.payload && action.payload.refresher ? action.payload.refresher.complete() : null),
        mergeMap((collection: Collection) => {

          const normalizedData = normalize(collection, CollectionSchema);
          const books = Object.keys(normalizedData.entities.books).map(key => normalizedData.entities.books[key]);
          const borrowings = Object.keys(normalizedData.entities.borrowings).map(key => normalizedData.entities.borrowings[key]);
          const exemplars = Object.keys(normalizedData.entities.exemplars).map(key => normalizedData.entities.exemplars[key]);

          return [
            new SearchBooksSuccess(books),
            new LoadExemplarsSuccess({exemplars}),
            new LoadBorrowingsSuccess({borrowings}),
            new LoadCollectionSuccess({collection})
          ];
        }),
        catchError((error) => {
          return of(new LoadCollectionError({errorMessage: error.message}));
        })
      );

    })
  );

  @Effect()
  addBookToCollection$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddBookToCollection),
    switchMap((action: AddBookToCollection) => {
        if (!action.payload.book._links || !action.payload.book._links.addToCollection) {
          return of(new AddBookToCollectionError({errorMessage: 'addToCollection link is not present'}));
        }
        return this.collectionService.addToCollection(action.payload.book).pipe(
          map((exemplar: Exemplar) => {
            return new AddBookToCollectionSuccess({exemplar});
          }),
          catchError((error) => {
            return of(new AddBookToCollectionError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  @Effect()
  removeExemplar$ = this.actions$.pipe(
    ofType(CollectionActionTypes.RemoveExemplar),
    switchMap((action: RemoveExemplar) => {
        if (!action.payload.exemplar._links || !action.payload.exemplar._links.removeExemplar) {
          return of(new RemoveExemplarError({errorMessage: 'removeExemplar link is not present'}));
        }
        return this.collectionService.removeExemplar(action.payload.exemplar).pipe(
          map((exemplar: Exemplar) => {
            return new RemoveExemplarSuccess({exemplar: action.payload.exemplar});
          }),
          catchError((error) => {
            return of(new RemoveExemplarError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  @Effect({dispatch: false})
  createLoadingOnRequests$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddBookToCollection,
      CollectionActionTypes.LoadCollection,
      CollectionActionTypes.RemoveExemplar),
    map(async (action: AddBookToCollection) => {
      const loading = await this.loadingCtrl.create();

      this.loading = loading;
      loading.present();
    })
  );

  @Effect({dispatch: false})
  dismissLoadingAfterRequests$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddBookToCollectionSuccess,
      CollectionActionTypes.AddBookToCollectionError,
      CollectionActionTypes.LoadCollectionSuccess,
      CollectionActionTypes.LoadCollectionError,
      CollectionActionTypes.RemoveExemplarSuccess,
      CollectionActionTypes.RemoveExemplarError),
    map(() => {
      if (this.loading) {
        this.loading.dismiss();
      }
    })
  );

  @Effect({dispatch: false})
  navigateOnAddToCollectionSuccess$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddBookToCollectionSuccess),
    map((action: AddBookToCollectionSuccess) => {
      const exemplar = action.payload.exemplar;
      this.toastCtrl.create({
        message: `${exemplar.book.title} wurde zur Sammlung hinzugefügt`,
        duration: 2000,
        position: 'top',
        buttons: [
          {
            side: 'end',
            icon: 'open',
            text: 'Bring mich hin',
            handler: () => {
              this.navCtrl.navigateRoot(`/app/collection/${exemplar.ownerId}/${exemplar.exemplarId}`);
            }
          }
        ]
      }).then((toast) => toast.present());
    })
  );

  @Effect({dispatch: false})
  navigateOnRemoveExemplarSuccess$ = this.actions$.pipe(
    ofType(CollectionActionTypes.RemoveExemplarSuccess),
    map((action: RemoveExemplarSuccess) => {
      this.navCtrl.navigateRoot('/app/collection');
      this.toastCtrl.create({
        message: `${action.payload.exemplar.book.title} wurde aus der Sammlung entfernt`,
        duration: 2000,
        position: 'top'
      }).then((toast) => toast.present());
    })
  );

  private loading: HTMLIonLoadingElement;


  constructor(private actions$: Actions<CollectionActions>,
              private collectionService: CollectionService,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {
  }

}
