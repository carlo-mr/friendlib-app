import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {AlertController, NavController} from '@ionic/angular';
import {
  AuthActionTypes,
  ChangeAvatar,
  ChangeAvatarError,
  ChangeAvatarSuccess,
  ForgotPassword,
  ForgotPasswordError,
  ForgotPasswordSuccess,
  Login,
  LoginError,
  LoginLocalStorageError,
  LoginSuccess,
  LogoutError,
  LogoutSuccess,
  NewPassword,
  NewPasswordError,
  NewPasswordSuccess,
  Register,
  RegisterError,
  RegisterSuccess
} from '../actions/auth.actions';
import {CognitoService} from '../services/cognito.service';
import {LoggedUser} from '../models/auth.model';
import {defer, of} from 'rxjs';
import {State} from '../../reducers';
import {select, Store} from '@ngrx/store';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    switchMap((action: Login) => {
        return this.cognitoService.logIn(action.payload.loginDetails).pipe(
          map((cognitoUser: any) => {
            const loggedUser: LoggedUser = {
              name: cognitoUser.signInUserSession.idToken.payload['cognito:username'],
              avatar: this.parseAvatar(cognitoUser),
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

  @Effect()
  register$ = this.actions$.pipe(
    ofType(AuthActionTypes.Register),
    switchMap((action: Register) => {
      return this.cognitoService.register(action.payload.registerDetails).pipe(
        tap((result) => console.log(JSON.stringify(result))),
        map((cognitoUser: any) => new RegisterSuccess(cognitoUser)),
        catchError((error) => of(new RegisterError({errorMessage: error.message})))
      );
    })
  );

  @Effect({dispatch: false})
  navigateOnloginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: LoginSuccess) => {
      this.navCtrl.navigateRoot('/app');
    })
  );

  @Effect()
  loginLocalStorage$ = defer(() => {
    return this.cognitoService.retrieveUserFromLocalStorage().pipe(
      map((cognitoUser: any) => {
        if (cognitoUser) {
          const loggedUser: LoggedUser = {
            name: cognitoUser.signInUserSession.idToken.payload['cognito:username'],
            avatar: this.parseAvatar(cognitoUser),
            session: cognitoUser.signInUserSession,
            // settings: JSON.parse(cognitoUser.signInUserSession.idToken.payload['profile'] || '{}')
          };

          return new LoginSuccess({loggedUser});
        }

        return new LoginLocalStorageError(null);
      }),
      catchError((error) => {
        return of(new LoginLocalStorageError(error.message));
      })
    );
  });

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    withLatestFrom(this.store$.pipe(select(state => state.auth.loggedUser))),
    map(([action, loggedUser]) => {
      if (this.cognitoService.logout(loggedUser.name)) {
        return new LogoutSuccess();
      }
      return new LogoutError({errorMessage: 'Logout fehler'});
    })
  );

  @Effect({dispatch: false})
  navigateOnlogoutSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutSuccess),
    map((action: LogoutSuccess) => {
      this.navCtrl.navigateRoot('/');
    })
  );

  @Effect()
  forgotpassword$ = this.actions$.pipe(
    ofType(AuthActionTypes.ForgotPassword),
    switchMap((action: ForgotPassword) => {
      return this.cognitoService.forgotPassword(action.payload.userName).pipe(
        map((destination: string) => new ForgotPasswordSuccess({destination})),
        catchError((error) => of(new ForgotPasswordError({errorMessage: error.message})))
      );
    })
  );

  @Effect({dispatch: false})
  showAlertOnForgotPasswordSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.ForgotPasswordSuccess),
    map((action: ForgotPasswordSuccess) => {
      this.alertCtrl.create({
        header: 'Password Code verschickt',
        message: `Es wurde eine Email an ${action.payload.destination} geschickt. Nutze den Code um ein neues Passwort zuvergeben.`,
        buttons: [
          {
            text: 'Alles klar'
          }
        ]
      })
        .then((alert) => alert.present())
        .catch(() => console.log('Alert could not be created.'));
    })
  );

  @Effect()
  newPassword$ = this.actions$.pipe(
    ofType(AuthActionTypes.NewPassword),
    switchMap((action: NewPassword) => {
      return this.cognitoService.newPassword(action.payload.newPasswordDetails).pipe(
        map((destination: string) => new NewPasswordSuccess()),
        catchError((error) => of(new NewPasswordError({errorMessage: error.message})))
      );
    })
  );

  @Effect({dispatch: false})
  showAlertOnNewPasswordSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.NewPasswordSuccess),
    map((action: NewPasswordSuccess) => {
      this.alertCtrl.create({
        header: 'Neues Passwort vergeben',
        message: `Du hast erfolgreich ein neues Passwort vergeben. Du kannst dich nun wieder einloggen`,
        buttons: [
          {
            text: 'Alles klar'
          }
        ]
      })
        .then((alert) => alert.present())
        .catch(() => console.log('Alert could not be created.'));
    })
  );

  @Effect({dispatch: false})
  navigateOnNewPasswordSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.NewPasswordSuccess),
    map((action: NewPasswordSuccess) => {
      this.navCtrl.navigateRoot('/');
    })
  );

  @Effect()
  changeAvatar$ = this.actions$.pipe(
    ofType(AuthActionTypes.ChangeAvatar),
    switchMap((action: ChangeAvatar) => {
      return this.cognitoService.changeAvatar(action.payload.avatar).pipe(
        map((avatar: object) => new ChangeAvatarSuccess({avatar})),
        catchError(error => of(new ChangeAvatarError({errorMessage: error.message})))
      );
    })
  );

  constructor(private actions$: Actions,
              private store$: Store<State>,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private cognitoService: CognitoService) {
  }

  private parseAvatar(cognitoUser: any) {
    try {
      return JSON.parse(cognitoUser.signInUserSession.idToken.payload['picture']);
    } catch (e) {
      console.error('error during picture parsing', e);
      return {};
    }
  }
}
