import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';
import * as fromCollection from '../reducers/collection.reducer';
import {CollectionService} from '../collection.service';
import {LoadCollectionSuccess} from '../actions/collection.actions';
import {Collection} from '../../common/collection.model';

/**
 * Heavily inspired by https://github.com/ngrx/platform/blob/master/projects/example-app/src/app/books/guards/book-exists.guard.ts
 */
@Injectable({
  providedIn: 'root',
})
export class CollectionExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromCollection.CollectionState>,
    private collectionService: CollectionService,
    private router: Router
  ) {
  }

  /**
   * This method checks if a collection with the given ID is already registered
   * in the Store
   */
  hasCollectionInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromCollection.selectEntities),
      map(entities => entities && !!entities[id]),
      take(1)
    );
  }

  /**
   * This method loads a collection with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasCollectionInApi(ownerId: string): Observable<boolean> {
    console.log('hasCollectionInApi: ', ownerId);
    return this.collectionService.loadCollection(ownerId).pipe(
      map((collection: Collection) => new LoadCollectionSuccess({collection})),
      tap(action => this.store.dispatch(action)),
      map(collection => !!collection),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  /**
   * `hasCollection` composes `hasCollectionInStore` and `hasCollectionInApi`. It first checks
   * if the collection is in store, and if not it then checks if it is in the
   * API.
   */
  hasCollection(id: string): Observable<boolean> {
    console.log('hasCollection: ', id);
    return this.hasCollectionInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          console.log('collection found in store');
          return of(inStore);
        }

        return this.hasCollectionInApi(id);
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a collection from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('collectionexistsguard');
    return this.hasCollection(route.params['ownerId']);
  }
}
