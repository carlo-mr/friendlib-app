import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {NavController} from '@ionic/angular';
import {AuthActionTypes, Login, LoginError, LoginSuccess} from '../actions/auth.actions';
import {CognitoService} from '../services/cognito.service';
import {LoggedUser} from '../models/auth.model';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    switchMap((action: Login) => {
        return this.loginService.logIn(action.payload.loginDetails).pipe(
          map((cognitoUser: any) => {
            const loggedUser: LoggedUser = {
              name: cognitoUser.signInUserSession.idToken.payload['cognito:username'],
              avatar: cognitoUser.signInUserSession.idToken.payload['picture'] || 'no',
              session: cognitoUser.signInUserSession
            };

            return new LoginSuccess({loggedUser});
          }),
          catchError((error) => {
            return of(new LoginError({errorMessage: error.message}));
          })
        );
      }
    )
  );

  @Effect({dispatch: false})
  navigateOnloginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: LoginSuccess) => {
      this.navCtrl.navigateRoot('/app/tabs/(home:home)');
    })
  );

  constructor(private actions$: Actions, private navCtrl: NavController, private loginService: CognitoService) {
  }
}
