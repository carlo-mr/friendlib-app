import {TestBed} from '@angular/core/testing';

import {environment} from '../../../environments/environment.test';
import {CognitoService} from './cognito.service';

describe('CognitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: 'AWS_CONFIG', useValue: environment.awsConfig
      }]
    });
  });

  it('should be created', () => {
    const service: CognitoService = TestBed.get(CognitoService);
    expect(service).toBeTruthy();
  });
});
