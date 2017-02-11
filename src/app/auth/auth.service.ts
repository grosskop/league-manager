import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private userPool: any;

    constructor() {
        AWSCognito.config.region = environment.region;
        AWS.config.region = environment.region;
        let poolData = {
            UserPoolId: environment.userpoolId,
            ClientId: environment.clientId
        };
        this.userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    }

    initAwsCredentials() {
        return Observable.create((observer) => {
            const cognitoUser = this.userPool.getCurrentUser();
            if (cognitoUser == null) {
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: environment.identityPoolId,
                });
                observer.complete();
            } else {
                cognitoUser.getSession((err, session) => {
                    if (err) {
                        observer.error(err);
                        return;
                    }
                    console.log('session validity: ' + session.isValid());

                    const poolUrl = `cognito-idp.${environment.region}.amazonaws.com/${environment.userpoolId}`;
                    console.log(poolUrl);
                    const logins = {};
                    logins[poolUrl] = session.getIdToken().getJwtToken();

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: environment.identityPoolId,
                        Logins: logins
                    });
                    console.log(session);
                    observer.next(null);
                    observer.complete();
                });
            }
        });
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
                    console.log('access token + ' + result.getAccessToken().getJwtToken());
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

    getUser() {
        return this.userPool.getCurrentUser();
    }

    isUserAdmin() {
        return this.getUserName() === 'dominik';
    }

    logOut() {
        this.getUser().signOut();
    }

    getUserName(): string {
        let user = this.getUser();
        if (user == null) {
            return null;
        }
        return user.username;
    }
}
