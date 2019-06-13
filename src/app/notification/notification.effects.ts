import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoadNotifications, LoadNotificationsError, LoadNotificationsSuccess, NotificationActionTypes} from './notification.actions';
import {NotificationService} from './notification.service';


@Injectable()
export class NotificationEffects {

  @Effect()
  loadNotifications$ = this.actions$.pipe(
    ofType(NotificationActionTypes.LoadNotifications),
    switchMap((action: LoadNotifications) => {
        return this.notificationService.loadNotifications().pipe(
          tap(() => action.payload.refresher ? action.payload.refresher.complete() : null),
          map((notifications: any) => {
            return new LoadNotificationsSuccess({notifications});
          }),
          catchError((error) => {
            return of(new LoadNotificationsError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  constructor(private actions$: Actions,
              private notificationService: NotificationService) {
  }

}
