import {TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {HttpClientModule} from '@angular/common/http';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
