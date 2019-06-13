import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';

import {NotificationEffects} from './notification.effects';
import {LoadNotifications, LoadNotificationsSuccess} from './notification.actions';
import {cold, hot} from 'jasmine-marbles';
import {NotificationService} from './notification.service';

describe('NotificationEffects', () => {
  let actions$: Observable<any>;
  let effects: NotificationEffects;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationEffects,
        provideMockActions(() => actions$),
        {
          provide: NotificationService,
          useValue: {
            loadNotifications: () => {
            }
          }
        }
      ]
    });

    effects = TestBed.get(NotificationEffects);
    notificationService = TestBed.get(NotificationService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('', () => {
    const action = new LoadNotifications({});
    const completion = new LoadNotificationsSuccess({notifications: []});

    spyOn(notificationService, 'loadNotifications').and.returnValue(of([]));

    // Refer to 'Writing Marble Tests' for details on '--a-' syntax
    actions$ = hot('--a-', {a: action});
    const expected = cold('--b', {b: completion});

    expect(effects.loadNotifications$).toBeObservable(expected);
  });
});
