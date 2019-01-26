import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {State} from './reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>) {
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(state => state.auth),
      map(((authState) => authState.isLoggedIn))
    );
  }
}
