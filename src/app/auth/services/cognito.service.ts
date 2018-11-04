import {Inject, Injectable} from '@angular/core';
// Cognito
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import {Subject} from 'rxjs';
import {LoginDetails} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  poolData: any = {
    UserPoolId: this.config.userPoolId,
    ClientId: this.config.clientId
  };

  readonly cognitoUserPool: CognitoUserPool;

  constructor(@Inject('AWS_CONFIG') private config) {
    AWS.config.region = config.region;

    this.cognitoUserPool = this.buildCognitoUserPool();
  }

  logout(userName: string) {
    const cognitoUser = this.buildCognitoUser(userName, this.cognitoUserPool);

    if (cognitoUser != null) {
      cognitoUser.signOut();
      return true;
    }
    return false;
  }

  logIn(loginDetails: LoginDetails) {
    const userPool = this.buildCognitoUserPool();

    const authenticationData = {
      Username: loginDetails.userName.replace(/ /g, ''),
      Password: loginDetails.password,
    };

    const authenticationDetails: AuthenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser: any = this.buildCognitoUser(loginDetails.userName.replace(/ /g, ''), userPool);

    const subject = new Subject();

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: any) => {
        const username = session.idToken.payload['cognito:username'];
        console.log(`User ${username} authenticated.`);

        subject.next(cognitoUser);
        subject.complete();
      },
      onFailure: error => {
        subject.error(error);
      },
      newPasswordRequired: () => {
        subject.error({message: 'New Password required'});
      },
      mfaRequired: () => {
        subject.error({message: 'MFA required'});
      },
      customChallenge: () => {
        subject.error({message: 'custom challenge'});
      }
    });

    return subject.asObservable();
  }


  public buildCognitoUserPool() {
    return new CognitoUserPool(this.poolData);
  }

  public buildCognitoUser(userName: string, userPool) {
    return new CognitoUser({
      Username: userName,
      Pool: userPool
    });
  }
}
