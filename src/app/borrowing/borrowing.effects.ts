import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoadingController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {BorrowingService} from './borrowing.service';

import * as fromBorrowing from '../borrowing/borrowing.reducer';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  AcceptBorrowing,
  AcceptBorrowingError,
  AcceptBorrowingSuccess,
  AddBorrowing,
  AddBorrowingError,
  AddBorrowingSuccess,
  BorrowingActionTypes,
  CompleteBorrowing,
  CompleteBorrowingError,
  LoadBorrowingsSuccess,
  ReceiveBorrowing,
  ReceiveBorrowingError,
  RejectBorrowing,
  RejectBorrowingError,
  RejectBorrowingSuccess
} from './borrowing.actions';
import {Borrowing} from '../common/borrowing.model';
import {normalize} from 'normalizr';
import {ExemplarSchema} from '../common/friendlib.schema';
import {LoadExemplarsSuccess} from '../exemplar/exemplar.actions';

@Injectable()
export class BorrowingEffects {

  private loading: any;

  /**
   *Borrowings are now included in the exemplar details directly and therefore do not need to be requested separately
   *
   @Effect()
   loadBorrowings$ = this.actions$.pipe(
   ofType(BorrowingActionTypes.LoadBorrowings),
   switchMap((action: LoadBorrowings) => {
      return this.borrowingService.get().pipe(
        map((response: Borrowing[]) => {
          return new LoadBorrowingsSuccess({borrowings: response});
        }),
        catchError((error) => {
          return of(new LoadBorrowingsError({errorMessage: error.message}));
        })
      );
    })
   );

   @Effect()
   loadExemplarBorrowings$ = this.actions$.pipe(
   ofType(BorrowingActionTypes.LoadExemplarBorrowings),
   switchMap((action: LoadExemplarBorrowings) => {
      return this.borrowingService.get(action.payload.exemplarId).pipe(
        map((response: Borrowing[]) => {
          return new LoadExemplarBorrowingsSuccess({borrowings: response});
        }),
        catchError((error) => {
          return of(new LoadExemplarBorrowingsError({errorMessage: error.message}));
        })
      );
    })
   );
   */

  @Effect()
  addBorrowing$ = this.actions$.pipe(
    ofType(BorrowingActionTypes.AddBorrowing),
    switchMap((action: AddBorrowing) => {
        return this.borrowingService.add(action.payload.bookOwner).pipe(
          map((response: any) => {
            return new AddBorrowingSuccess({borrowing: response});
          }),
          catchError((error) => {
            return of(new AddBorrowingError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  @Effect()
  acceptBorrowing$ = this.actions$.pipe(
    ofType(BorrowingActionTypes.AcceptBorrowing),
    switchMap((action: AcceptBorrowing) => {
        return this.borrowingService.update(action.payload.borrowing, action.payload.action).pipe(
          map((response: Borrowing) => {
            return new AcceptBorrowingSuccess({
              borrowing: response
            });
          }),
          catchError((error) => {
            return of(new AcceptBorrowingError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  @Effect()
  rejectBorrowing$ = this.actions$.pipe(
    ofType(BorrowingActionTypes.RejectBorrowing),
    switchMap((action: RejectBorrowing) => {
        return this.borrowingService.update(action.payload.borrowing, action.payload.action).pipe(
          map((response: Borrowing) => {
            return new RejectBorrowingSuccess({
              borrowing: response
            });
          }),
          catchError((error) => {
            return of(new RejectBorrowingError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  @Effect()
  receiveBorrowing$ = this.actions$.pipe(
    ofType(BorrowingActionTypes.ReceiveBorrowing),
    switchMap((action: ReceiveBorrowing) => {
        return this.borrowingService.update(action.payload.borrowing, action.payload.action).pipe(
          mergeMap((receiveBorrowingResponse) => {
            const normalizedReceiveBorrowingResponse = normalize(receiveBorrowingResponse, ExemplarSchema);

            const borrowings = this.mapEntities(normalizedReceiveBorrowingResponse, 'borrowings');

            return [
              new LoadBorrowingsSuccess({borrowings: borrowings}),
              new LoadExemplarsSuccess({exemplars: [normalizedReceiveBorrowingResponse.result]})
            ];
          }),
          catchError((error) => {
            return of(new ReceiveBorrowingError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  @Effect()
  completeBorrowing$ = this.actions$.pipe(
    ofType(BorrowingActionTypes.CompleteBorrowing),
    switchMap((action: CompleteBorrowing) => {
        return this.borrowingService.update(action.payload.borrowing, action.payload.action).pipe(
          mergeMap((completeBorrowingResponse) => {
            const normalizedReceiveBorrowingResponse = normalize(completeBorrowingResponse, ExemplarSchema);

            const borrowings = this.mapEntities(normalizedReceiveBorrowingResponse, 'borrowings');

            return [
              new LoadBorrowingsSuccess({borrowings: borrowings}),
              new LoadExemplarsSuccess({exemplars: [normalizedReceiveBorrowingResponse.result]})
            ];
          }),
          catchError((error) => {
            return of(new CompleteBorrowingError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  @Effect({dispatch: false})
  createLoadingOnAddBorrowing$ = this.actions$.pipe(
    ofType(BorrowingActionTypes.AddBorrowing, BorrowingActionTypes.LoadExemplarBorrowings, BorrowingActionTypes.UpdateBorrowing),
    switchMap((action: AddBorrowing) => {
      this.loadingCtrl.create().then((loading) => {
        this.loading = loading;
        loading.present();
      });
      return of();
    })
  );

  @Effect({dispatch: false})
  dismissLoadingOnAddBorrowing$ = this.actions$.pipe(
    ofType(BorrowingActionTypes.AddBorrowingSuccess,
      BorrowingActionTypes.AddBorrowingError,
      BorrowingActionTypes.LoadExemplarBorrowingsSuccess,
      BorrowingActionTypes.LoadExemplarBorrowingsError,
      BorrowingActionTypes.UpdateBorrowingSuccess,
      BorrowingActionTypes.UpdateBorrowingError),
    map(() => {
      if (this.loading) {
        this.loading.dismiss();
      }
    })
  );

  constructor(private actions$: Actions,
              private store$: Store<fromBorrowing.BorrowingState>,
              private borrowingService: BorrowingService,
              private loadingCtrl: LoadingController) {
  }

  private mapEntities(normalizedData: any, entityName: string) {
    return Object.keys(normalizedData.entities[entityName]).map(key => normalizedData.entities[entityName][key]);
  }
}
