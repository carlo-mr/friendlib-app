import {TestBed} from '@angular/core/testing';

import {CognitoUserService} from './cognito-user.service';
import {provideMockStore} from '@ngrx/store/testing';

describe('CognitoUserService', () => {

  const initialState = {
    user: {
      session: {
        idToken: 'token'
      }
    }
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: 'AWS_CONFIG',
        useValue: {
          userPoolId: 'eu-central-1_pfvYGaiqz',
          clientId: '28902im3i13g5qnfljcg84at1t',
          region: 'eu-central-1'
        }
      },
      provideMockStore({initialState})
    ]
  }));

  it('should be created', () => {
    const service: CognitoUserService = TestBed.get(CognitoUserService);
    expect(service).toBeTruthy();
  });
});
