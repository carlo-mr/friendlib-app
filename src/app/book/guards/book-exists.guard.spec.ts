import {inject, TestBed} from '@angular/core/testing';

import {BookExistsGuard} from './book-exists.guard';
import {StoreModule} from '@ngrx/store';
import {bookReducer} from '../book.reducer';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('BookExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('book', bookReducer),
        RouterTestingModule
      ],
      providers: [BookExistsGuard]
    });
  });

  it('should ...', inject([BookExistsGuard], (guard: BookExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
