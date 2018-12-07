import {Inject, Injectable} from '@angular/core';
// Cognito
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import {of, Subject} from 'rxjs';
import {LoginDetails, RegisterDetails} from '../models/auth.model';

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
    const authenticationData = {
      Username: loginDetails.userName.replace(/ /g, ''),
      Password: loginDetails.password,
    };

    const authenticationDetails: AuthenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser: any = this.buildCognitoUser(loginDetails.userName.replace(/ /g, ''), this.cognitoUserPool);

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

  register(registerDetails: RegisterDetails) {
    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: registerDetails.email
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    const subject = new Subject();

    this.cognitoUserPool.signUp(
      registerDetails.userName.replace(/ /g, ''),
      registerDetails.password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          console.log('error ' + err);
          subject.error(err);
        } else {
          const cognitoUser = result.user;
          console.log('user name is ' + cognitoUser.getUsername());

          subject.next(cognitoUser);
          subject.complete();
        }
      });

    return subject.asObservable();
  }

  retrieveUserFromLocalStorage() {
    const subject = new Subject();

    const cognitoUser: any = this.buildCognitoUserPool().getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (getSessionError, session) {
        if (getSessionError) {
          alert(getSessionError.message);
          return subject.error(getSessionError);
        }

        console.log('session validity: ' + session.isValid());

        if (session.isValid()) {
          console.log('refresh session');

          cognitoUser.refreshSession(session.getRefreshToken(), (refreshSessionError, refreshedSession) => {
            if (refreshSessionError) {
              alert(refreshSessionError.message);
              return subject.error(refreshSessionError);
            }
            return subject.next(cognitoUser);
          });
        } else {
          return subject.error(null);
        }
      });
    } else {
      return of(null);
    }
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

  forgotPassword(userName: string) {
    const subject = new Subject();

    const cognitoUser = this.buildCognitoUser(userName, this.cognitoUserPool);

    cognitoUser.forgotPassword({
      onSuccess: function (result) {
        console.log('call result: ' + result);
      },
      onFailure: function (err) {
        subject.error(err);
      },
      inputVerificationCode(data) {
        subject.next(data.CodeDeliveryDetails.Destination);
      }
    });

    return subject.asObservable();
  }
}
