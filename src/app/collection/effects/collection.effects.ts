import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  AddBookToCollection,
  AddBookToCollectionError,
  AddBookToCollectionSuccess,
  AddCollection,
  CollectionActions,
  CollectionActionTypes,
  LoadCollection,
  LoadCollectionError,
  LoadCollectionSuccess,
  RemoveExemplar,
  RemoveExemplarError,
  RemoveExemplarSuccess
} from '../actions/collection.actions';
import {normalize} from 'normalizr';
import {LoadBooksSuccess, LoadBookSuccess} from '../../book/book.actions';
import {CollectionSchema, ExemplarSchema} from '../../common/friendlib.schema';
import {Action, Store} from '@ngrx/store';
import {CollectionService} from '../collection.service';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {LoadExemplarsSuccess} from '../../exemplar/exemplar.actions';
import {LoadBorrowingsSuccess} from '../../borrowing/borrowing.actions';

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
        tap(() => this.completeRefresher(action)),
        mergeMap((loadCollectionResponse: any) => {

          const normalizedloadCollectionResponse = normalize(loadCollectionResponse, CollectionSchema);
          return this.normalizeLoadCollectionResponse(normalizedloadCollectionResponse);
        }),
        catchError((error) => {
          return of(new LoadCollectionError({errorMessage: error.message}));
        })
      );

    })
  );

  @Effect()
  loadUnnormalizedCollection$ = this.actions$.pipe(
    ofType(CollectionActionTypes.LoadCollectionSuccess),
    mergeMap((action: LoadCollectionSuccess) => {
      const normalizedLoadCollectionResponse = normalize(action.payload.unnormalizedCollection, CollectionSchema);
      return this.normalizeLoadCollectionResponse(normalizedLoadCollectionResponse);
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
          mergeMap((addToCollectionResponse: any) => {

            const normalizedAddToCollectionResponse = normalize(addToCollectionResponse, ExemplarSchema);
            const books = this.mapEntities(normalizedAddToCollectionResponse, 'books');
            const exemplar = normalizedAddToCollectionResponse.result;

            return [
              new AddBookToCollectionSuccess({exemplar: exemplar, book: action.payload.book}),
              new LoadBookSuccess(books[0]),
              new LoadExemplarsSuccess({exemplars: [exemplar]})
            ];
          }),
          catchError((error) => of(new AddBookToCollectionError({errorMessage: error.message})))
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
          map((removeExemplarResponse: any) => new RemoveExemplarSuccess({
            exemplar: action.payload.exemplar
          })),
          catchError((error) => of(new RemoveExemplarError({errorMessage: error.message})
          ))
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
      CollectionActionTypes.AddCollection,
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
      const book = action.payload.book;

      this.toastCtrl.create({
        message: `${book.title} wurde zur Sammlung hinzugefügt`,
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
    tap((action: RemoveExemplarSuccess) => {
      this.navCtrl.navigateRoot('/app/collection');
      this.toastCtrl.create({
        // Use withLatest from store to select book from exemplar and display book title in toast!
        message: `Das Buch wurde aus der Sammlung entfernt`,
        duration: 2000,
        position: 'top'
      }).then((toast) => toast.present());
    })
  );

  private loading: HTMLIonLoadingElement;

  constructor(private actions$: Actions<CollectionActions>,
              private store$: Store<any>,
              private collectionService: CollectionService,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {
  }

  private normalizeLoadCollectionResponse(normalizedloadCollectionResponse): Action[] {
    const books = this.mapEntities(normalizedloadCollectionResponse, 'books');
    const borrowings = this.mapEntities(normalizedloadCollectionResponse, 'borrowings');
    const exemplars = this.mapEntities(normalizedloadCollectionResponse, 'exemplars');

    const collection = normalizedloadCollectionResponse.result;

    return [
      new LoadBooksSuccess(books),
      new LoadExemplarsSuccess({exemplars}),
      new LoadBorrowingsSuccess({borrowings}),
      new AddCollection({collection: collection})
    ];
  }

  private mapEntities(normalizedData: any, entityName: string) {
    return Object.keys(normalizedData.entities[entityName]).map(key => normalizedData.entities[entityName][key]);
  }

  private completeRefresher(action) {
    if (action.payload && action.payload.refresher) {
      action.payload.refresher.complete();
    }
  }
}
