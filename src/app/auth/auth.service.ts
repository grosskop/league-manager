import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private userPool: any;
    constructor() {
        AWSCognito.config.region = environment.region;

        let poolData = {
            UserPoolId: environment.userpoolId,
            ClientId: environment.clientId
        };
        this.userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    }

    login(username: string, password: string) {
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

    getUserName() {
        return this.userPool.getCurrentUser().username;
    }
}