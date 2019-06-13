import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';

import {UserEffects} from './user.effects';
import {CognitoUserService} from './cognito-user.service';
import {cold, hot} from 'jasmine-marbles';
import {LoadUsers, LoadUsersSuccess} from './user.actions';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userService: CognitoUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: CognitoUserService,
          useValue: {
            loadUsers: () => {
            }
          }
        }
      ]
    });

    effects = TestBed.get(UserEffects);
    userService = TestBed.get(CognitoUserService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });


  it('', () => {
    const action = new LoadUsers();
    const completion = new LoadUsersSuccess({users: []});

    spyOn(userService, 'loadUsers').and.returnValue(of([]));

    // Refer to 'Writing Marble Tests' for details on '--a-' syntax
    actions$ = hot('--a-', {a: action});
    const expected = cold('--b', {b: completion});

    expect(effects.loadUsers$).toBeObservable(expected);
  });
});
