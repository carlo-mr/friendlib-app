import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of, throwError} from 'rxjs';

import {AuthEffects} from './auth.effects';
import {AlertController, NavController} from '@ionic/angular';
import {CognitoService} from '../services/cognito.service';

import * as fromActions from '../actions/auth.actions';
import {cold, hot} from 'jasmine-marbles';
import {LoggedUser, LoginDetails, RegisterDetails} from '../models/auth.model';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../../reducers';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let service: CognitoService;
  let navCtrl: NavController;
  let alertCtrl: AlertController;

  const loginDetails: LoginDetails = {userName: '', password: ''};
  const registerDetails: RegisterDetails = {userName: '', email: 'test@friendlib.de', password: ''};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: NavController, useValue: {
            navigateRoot: () => {
            }
          }
        },
        {
          provide: AlertController, useValue: {
            create: () => {
            }
          }
        },
        {
          provide: CognitoService, useValue: {
            logIn: () => {
            },
            register: () => {
            }
          }
        }
      ],
      imports: [
        StoreModule.forRoot(reducers)
      ]
    });

    effects = TestBed.get(AuthEffects);
    service = TestBed.get(CognitoService);
    navCtrl = TestBed.get(NavController);
    alertCtrl = TestBed.get(AlertController);
  });

  describe('login$ effect', () => {
    it('should map cognito response to LoggedUser', () => {
      const mockCognitoUser = {
        signInUserSession: {
          idToken: {
            payload: {
              'cognito:username': 'test',
              'picture': 'm2'
            }
          }
        }
      };
      spyOn(service, 'logIn').and.returnValue(of(mockCognitoUser));

      const action = new fromActions.Login({loginDetails});
      const completion = new fromActions.LoginSuccess({
        loggedUser: {
          name: 'test',
          avatar: 'm2',
          session: mockCognitoUser.signInUserSession
        } as LoggedUser
      });

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.login$).toBeObservable(expected);
      expect(service.logIn).toHaveBeenCalled();
    });

    it('should return the message of the error', () => {
      spyOn(service, 'logIn').and.callFake(() => {
        return throwError({message: 'Error'});
      });

      const loginAction = new fromActions.Login({loginDetails});
      const loginError = new fromActions.LoginError({
        errorMessage: 'Error'
      });

      actions$ = hot('--a-', {a: loginAction});
      const expected = cold('--b', {b: loginError});

      expect(effects.login$).toBeObservable(expected);
      expect(service.logIn).toHaveBeenCalled();
    });
  });

  describe('register$ effect', () => {
    it('should call cognito service and return Success action with result', () => {
      spyOn(service, 'register').and.returnValue(of({cognitoUser: 'test'}));

      const action = new fromActions.Register({registerDetails});
      const completion = new fromActions.RegisterSuccess({cognitoUser: 'test'});

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.register$).toBeObservable(expected);
      expect(service.register).toHaveBeenCalled();
    });

    it('should return the message of the error', () => {
      spyOn(service, 'register').and.callFake(() => {
        return throwError({message: 'Error'});
      });

      const registerAction = new fromActions.Register({registerDetails});
      const registerError = new fromActions.RegisterError({
        errorMessage: 'Error'
      });

      actions$ = hot('--a-', {a: registerAction});
      const expected = cold('--b', {b: registerError});

      expect(effects.register$).toBeObservable(expected);
      expect(service.register).toHaveBeenCalled();
    });
  });

  describe('navigateOnloginSuccess$ effect', () => {

    it('should navigate on successful login', () => {
      spyOn(navCtrl, 'navigateRoot');

      const action = new fromActions.LoginSuccess({loggedUser: {} as LoggedUser});
      actions$ = hot('--a', {a: action});

      effects.navigateOnloginSuccess$.subscribe(() => {
        expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/tabs/home');
      });
    });
  });

  describe('navigateOnlogoutSuccess$ effect', () => {

    it('should navigate on successful logout', () => {
      spyOn(navCtrl, 'navigateRoot');

      const action = new fromActions.LogoutSuccess();
      actions$ = hot('--a', {a: action});

      effects.navigateOnlogoutSuccess$.subscribe(() => {
        expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('showAlertOnForgotPasswordSuccess$ effect', () => {
    it('should display an alert on forgot password', () => {
      spyOn(alertCtrl, 'create').and.returnValue(Promise.resolve());

      const action = new fromActions.ForgotPasswordSuccess({destination: 'test@friendlib.de'});
      actions$ = hot('--a', {a: action});

      effects.showAlertOnForgotPasswordSuccess$.subscribe(() => {
        expect(alertCtrl.create).toHaveBeenCalled();
      });
    });
  });
});
