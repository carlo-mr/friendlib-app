import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of, throwError} from 'rxjs';

import {AuthEffects} from './auth.effects';
import {NavController} from '@ionic/angular';
import {CognitoService} from '../services/cognito.service';

import * as fromActions from '../actions/auth.actions';
import {cold, hot} from 'jasmine-marbles';
import {LoggedUser} from '../models/auth.model';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let service: CognitoService;
  let navCtrl: NavController;

  const loginDetails = {userName: '', password: ''};

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
          provide: CognitoService, useValue: {
            logIn: () => {
            }
          }
        }
      ]
    });

    effects = TestBed.get(AuthEffects);
    service = TestBed.get(CognitoService);
    navCtrl = TestBed.get(NavController);
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

      const action = new fromActions.Login({loginDetails});
      const completion = new fromActions.LoginError({
        errorMessage: 'Error'
      });

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.login$).toBeObservable(expected);
      expect(service.logIn).toHaveBeenCalled();
    });
  });


  describe('navigateOnloginSuccess$ effect', () => {

    it('should navigate on successful login', () => {
      spyOn(navCtrl, 'navigateRoot');

      const action = new fromActions.LoginSuccess({loggedUser: {} as LoggedUser});
      actions$ = hot('--a', {a: action});

      effects.navigateOnloginSuccess$.subscribe(() => {
        expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/app/tabs/(home:home)');
      });
    });
  });
});
