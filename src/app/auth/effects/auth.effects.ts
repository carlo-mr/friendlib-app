import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, debounce, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {
  AuthActionTypes,
  ChangeAvatar,
  ChangeAvatarError,
  ChangeAvatarSuccess,
  ChangeSettings,
  ChangeSettingsError,
  ChangeSettingsSuccess,
  ForgotPassword,
  ForgotPasswordError,
  ForgotPasswordSuccess,
  Login,
  LoginError,
  LoginLocalStorage,
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
import {LoggedUser, Settings} from '../models/auth.model';
import {defer, of, timer} from 'rxjs';
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
              avatar: AuthEffects.parseAvatar(cognitoUser),
              session: cognitoUser.signInUserSession,
              settings: JSON.parse(cognitoUser.signInUserSession.idToken.payload['profile'] || '{}')
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
  loginLocalStorage$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginLocalStorage),
    switchMap((action: LoginLocalStorage) => {
      return this.cognitoService.retrieveUserFromLocalStorage().pipe(
        map((cognitoUser: any) => {
          if (cognitoUser) {
            const loggedUser: LoggedUser = {
              name: cognitoUser.signInUserSession.idToken.payload['cognito:username'],
              avatar: AuthEffects.parseAvatar(cognitoUser),
              session: cognitoUser.signInUserSession,
              settings: JSON.parse(cognitoUser.signInUserSession.idToken.payload['profile'] || '{}')
            };

            return new LoginSuccess({loggedUser});
          }

          return new LoginLocalStorageError(null);
        }),
        catchError((error) => {
          return of(new LoginLocalStorageError({errorMessage: error.message}));
        })
      );
    })
  );

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

  @Effect({dispatch: false})
  showAlertOnError$ = this.actions$.pipe(
    ofType(AuthActionTypes.ForgotPasswordError,
      AuthActionTypes.RegisterError,
      AuthActionTypes.NewPasswordError,
      AuthActionTypes.LoginError,
      AuthActionTypes.LoginLocalStorageError),
    map((action: ForgotPasswordError | RegisterError | LoginError | LoginLocalStorageError) => {

      if (action.payload && action.payload.errorMessage) {
        this.alertCtrl.create({
          header: 'Fehler',
          subHeader: `Es ist ein Fehler aufgetreten.`,
          message: action.payload.errorMessage,
          buttons: [
            {
              text: 'Alles klar'
            }
          ]
        })
          .then((alert) => {
            alert.present();
          })
          .catch(() => console.log('Alert could not be created.'));
      } else {
        if (this.loading) {
          this.loading.dismiss();
        }
      }
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

  @Effect({dispatch: false})
  createLoadingOnRequests$ = this.actions$.pipe(
    ofType(AuthActionTypes.ChangeAvatar,
      AuthActionTypes.ForgotPassword,
      AuthActionTypes.Login,
      AuthActionTypes.LoginLocalStorage,
      AuthActionTypes.Register),
    map(async () => {
      const loading = await this.loadingCtrl.create({
        duration: 5000
      });

      this.loading = loading;
      loading.present();
    })
  );

  @Effect({dispatch: false})
  dismissLoadingAfterRequests$ = this.actions$.pipe(
    ofType(AuthActionTypes.ChangeAvatarSuccess,
      AuthActionTypes.ChangeAvatarError,
      AuthActionTypes.ForgotPasswordSuccess,
      AuthActionTypes.ForgotPasswordError,
      AuthActionTypes.LoginSuccess,
      AuthActionTypes.LoginError,
      AuthActionTypes.LoginLocalStorageSuccess,
      AuthActionTypes.LoginLocalStorageError,
      AuthActionTypes.RegisterSuccess,
      AuthActionTypes.RegisterError),
    debounce(() => timer(700)),
    map(() => {
      if (this.loading) {
        this.loading.dismiss();
      }
    })
  );

  @Effect()
  changeSettings$ = this.actions$.pipe(
    ofType(AuthActionTypes.ChangeSettings),
    map((action: ChangeSettings) => action.payload.settings),
    switchMap((settings: Settings) => {

      return this.cognitoService.changeSettings(settings)
        .pipe(
          map(() => new ChangeSettingsSuccess({settings})),
          catchError((error) => of(new ChangeSettingsError({errorMessage: error.message})))
        );
    })
  );

  @Effect()
  registerPushDevice$ = this.actions$.pipe(
    ofType(AuthActionTypes.DeviceRegistered),
    withLatestFrom(this.store$.pipe(select(state => state.auth.loggedUser))),
    switchMap(([deviceRegistered, loggedUser]: [any, LoggedUser]) => {
      const deviceToken = deviceRegistered.registration.registrationId;

      if (loggedUser && loggedUser.settings && loggedUser.settings.deviceToken !== deviceToken) {

        return this.cognitoService
          .registerPlatformEndpoint(deviceToken, loggedUser)
          .pipe(
            map((result: any) => new ChangeSettings({
              settings: {
                ...loggedUser.settings,
                endpointArn: result.EndpointArn,
                deviceToken: deviceToken
              }
            })),
            catchError((error) => of(new ChangeSettingsError({errorMessage: error.message})))
          );
      } else {
        console.log('Nothing todo');
        return of();
      }
    })
  );

  @Effect()
  triggerLoginLocalStorage$ = defer(() => of(new LoginLocalStorage()));

  private loading: HTMLIonLoadingElement;

  constructor(private actions$: Actions,
              private store$: Store<State>,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private cognitoService: CognitoService) {
  }

  private static parseAvatar(cognitoUser: any) {
    try {
      return JSON.parse(cognitoUser.signInUserSession.idToken.payload['picture']);
    } catch (e) {
      console.error('error during picture parsing', e);
      return {};
    }
  }
}
