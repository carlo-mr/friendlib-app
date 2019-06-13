import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {asyncScheduler, of} from 'rxjs';
import {LoadUsers, LoadUsersError, LoadUsersSuccess, UserActionTypes} from './user.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CognitoUserService} from './cognito-user.service';


@Injectable()
export class UserEffects {

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    switchMap((action: LoadUsers) => {
        return this.cognitoUserService.loadUsers().pipe(
          map((users: any) => {
            return new LoadUsersSuccess({users});
          }),
          catchError((error) => {
            return of(new LoadUsersError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  @Effect()
  init$ = of(new LoadUsers(), asyncScheduler);

  constructor(private actions$: Actions,
              private cognitoUserService: CognitoUserService) {
  }

}
