import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoadingController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {BorrowingService} from './borrowing.service';

import * as fromBorrowing from '../borrowing/borrowing.reducer';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  AddBorrowing,
  AddBorrowingError,
  AddBorrowingSuccess,
  BorrowingActionTypes,
  LoadBorrowings,
  LoadBorrowingsError,
  LoadBorrowingsSuccess,
  LoadExemplarBorrowings,
  LoadExemplarBorrowingsError,
  LoadExemplarBorrowingsSuccess,
  UpdateBorrowing,
  UpdateBorrowingError,
  UpdateBorrowingSuccess
} from './borrowing.actions';
import {Borrowing} from '../common/borrowing.model';

@Injectable()
export class BorrowingEffects {

  private loading: any;

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

  @Effect()
  addBorrowing$ = this.actions$.pipe(
    ofType(BorrowingActionTypes.AddBorrowing),
    switchMap((action: AddBorrowing) => {
        return this.borrowingService.add(action.payload.exemplarId).pipe(
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
  updateBorrowing$ = this.actions$.pipe(
    ofType(BorrowingActionTypes.UpdateBorrowing),
    switchMap((action: UpdateBorrowing) => {
        return this.borrowingService.update(action.payload.borrowing, action.payload.action).pipe(
          map((response: any) => {
            return new UpdateBorrowingSuccess({
              borrowing: action.payload.borrowing,
              newStatus: response.status,
              updateDate: response.updateDate
            });
          }),
          catchError((error) => {
            return of(new UpdateBorrowingError({errorMessage: error.message}));
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
}
