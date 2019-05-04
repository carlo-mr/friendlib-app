import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromAuth from '../reducers/auth.reducer';
import {AuthState} from '../reducers/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>) {
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(fromAuth.isLoggedIn));
  }
}
