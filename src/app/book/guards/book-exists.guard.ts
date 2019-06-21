import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';
import * as fromBooks from '../book.reducer';
import {BookService} from '../book.service';
import {LoadBookSuccess} from '../book.actions';

/**
 * Heavily inspired by https://github.com/ngrx/platform/blob/master/projects/example-app/src/app/books/guards/book-exists.guard.ts
 */
@Injectable({
  providedIn: 'root',
})
export class BookExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromBooks.BookState>,
    private bookService: BookService,
    private router: Router
  ) {
  }

  /**
   * This method checks if a book with the given ID is already registered
   * in the Store
   */
  hasBookInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromBooks.selectEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  /**
   * This method loads a book with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasBookInApi(id: string): Observable<boolean> {
    return this.bookService.retrieveBook(id).pipe(
      map(bookEntity => new LoadBookSuccess(bookEntity)),
      tap(action => this.store.dispatch(action)),
      map(book => !!book),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  /**
   * `hasBook` composes `hasBookInStore` and `hasBookInApi`. It first checks
   * if the book is in store, and if not it then checks if it is in the
   * API.
   */
  hasBook(id: string): Observable<boolean> {
    return this.hasBookInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasBookInApi(id);
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasBook(route.params['id']);
  }
}
