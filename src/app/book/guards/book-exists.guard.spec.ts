import { TestBed, async, inject } from '@angular/core/testing';

import { BookExistsGuard } from './book-exists.guard';

describe('BookExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookExistsGuard]
    });
  });

  it('should ...', inject([BookExistsGuard], (guard: BookExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
