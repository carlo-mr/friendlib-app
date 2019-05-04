import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import {first, flatMap} from 'rxjs/operators';

/**
 * see https://antonyderham.me/post/angular-ngrx-auth-interceptor/
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private idToken: any;

  constructor(private store: Store<fromAuth.AuthState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(fromAuth.getIdToken).pipe(
      first(),
      flatMap(token => {
        const authReq = !!token ? request.clone({
          setHeaders: {Authorization: 'Bearer ' + token.jwtToken},
        }) : request;
        return next.handle(authReq);
      }),
    );
  }
}
