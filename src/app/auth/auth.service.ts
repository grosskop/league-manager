import { LeagueUser } from './league-user';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

  private userPool: any;
  public user$ = new ReplaySubject<LeagueUser>(1);

  constructor() {
    AWSCognito.config.region = environment.region;
    AWS.config.region = environment.region;
    let poolData = {
      UserPoolId: environment.userpoolId,
      ClientId: environment.clientId
    };
    this.userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    this.updateAwsCredentials();
  }

  updateAwsCredentials() {
    const cognitoUser = this.getUser();
    if (cognitoUser == null) {
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: environment.identityPoolId,
      });
      this.user$.next(null);
    } else {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.error(err);
          throw err;
        }
        console.log('session validity: ' + session.isValid());

        const poolUrl = `cognito-idp.${environment.region}.amazonaws.com/${environment.userpoolId}`;
        const logins = {};
        logins[poolUrl] = session.getIdToken().getJwtToken();

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: environment.identityPoolId,
          Logins: logins
        });
        this.user$.next(new LeagueUser(cognitoUser.username, this.isAdmin(session)));
      });
    }
  }

  logIn(username: string, password: string) {
    if (username == null || password == null) {
      return Observable.throw('Missing credentials!');
    }
    let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
      Username: username,
      Password: password,
    });
    let userData = {
      Username: username,
      Pool: this.userPool
    };
    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          observer.next(null);
          observer.complete();
        },
        onFailure: function (err) {
          observer.error(err);
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          delete userAttributes.email_verified;
          userAttributes.preferred_username = username;

          // Get these details and call
          cognitoUser.completeNewPasswordChallenge(password, userAttributes, this);
        }
      });
    });
  }

  private getUser() {
    return this.userPool.getCurrentUser();
  }

  private isAdmin(session) {
    const groups = this.getGroupsFromSession(session);
    return _.includes(groups, 'LeagueAdmin');
  }

  private getGroupsFromSession(session) {
    const idToken = session.getIdToken().getJwtToken();
    const payload = jwt_decode(idToken);
    return payload['cognito:groups'];
  }

  logOut() {
    this.getUser().signOut();
    this.user$.next(null);
  }
}
