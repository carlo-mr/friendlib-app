import {Inject, Injectable} from '@angular/core';
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import {Observable, Subject} from 'rxjs';
import {User} from './user.model';
import {AvataaarsConfig} from '../avataaars/components/avataaars-wrapper/avataaars-wrapper.component';
import {Store} from '@ngrx/store';
import * as fromAuth from '../auth/reducers/auth.reducer';
import {filter, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CognitoUserService {

  poolData: any = {
    UserPoolId: this.config.userPoolId,
    ClientId: this.config.clientId
  };

  readonly cognitoUserPool: CognitoUserPool;


  private static parseAvatar(pictureAttributeValue: string) {
    try {
      return JSON.parse(pictureAttributeValue);
    } catch (e) {
      return {};
    }
  }

  constructor(@Inject('AWS_CONFIG') private config, private store: Store<fromAuth.AuthState>) {
    AWS.config.region = config.region;

    this.cognitoUserPool = this.buildCognitoUserPool();
  }

  public buildCognitoUserPool() {
    return new CognitoUserPool(this.poolData);
  }

  performLoadUsers(idToken: any): Observable<User[]> {
    const logins = {};
    logins[this.config.loginId] = idToken.jwtToken;

    AWS.config.update({
      region: this.config.region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this.config.identityPoolId,
        Logins: logins
      })
    });

    const listUsersParams = {
      UserPoolId: this.config.userPoolId
    };

    const subject = new Subject<User[]>();
    const provider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-19', region: this.config.region});
    provider.listUsers(listUsersParams).promise()
      .then((response) => {
        if (response.Users) {
          subject.next(response.Users
            .map((cognitoUser) => {
              const user: User = {
                id: cognitoUser.Username,
                avatar: {} as AvataaarsConfig
              };

              if (cognitoUser.Attributes) {
                const pictureAttribute = cognitoUser.Attributes.find((attribute) => {
                  return attribute.Name === 'picture';
                });

                if (pictureAttribute) {
                  user.avatar = CognitoUserService.parseAvatar(pictureAttribute.Value);
                }
              }
              return user;
            }));
        } else {
          subject.next([]);
        }
      })
      .catch((reason => subject.error({message: reason})));

    return subject.asObservable();
  }

  loadUsers(): Observable<User[]> {
    return this.store.select(fromAuth.getIdToken).pipe(
      filter((token) => token),
      take(1),
      switchMap((idToken) => {
        return this.performLoadUsers(idToken);
      }));

  }

}
