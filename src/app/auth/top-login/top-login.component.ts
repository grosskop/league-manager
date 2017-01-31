import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lm-top-login',
    templateUrl: './top-login.component.html',
    styleUrls: ['./top-login.component.scss']
})
export class TopLoginComponent implements OnInit {

    private username: string;
    private password: string;

    buttonText = 'Login';
    loginVisible = false;
    loggedIn = false;
    loggingIn = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        let username = this.authService.getUserName();
        if (username != null) {
            this.loggedIn = true;
            this.buttonText = username;
        }
    }

    userClicked() {
        if (this.loggedIn) {
            this.authService.logOut();
            this.loggedIn = false;
            this.buttonText = 'Login';
        } else if (!this.loginVisible) {
            this.loginVisible = true;
            this.buttonText = 'Go for it';
        } else {
            this.loggingIn = true;
            this.authService.logIn(this.username, this.password).subscribe(
                () => {
                    console.log('login succeeded!');
                    this.loginVisible = false;
                    this.loggedIn = true;
                    this.buttonText = this.authService.getUserName();
                    this.loggingIn = false;
                },
                err => {
                    console.error(err);
                    this.loggingIn = false;
                }
            );
        }
    }

    mouseenter() {
        if (this.loggedIn) {
            this.buttonText = 'Logout';
        }
    }

    mouseleave() {
        if (this.loggedIn) {
            this.buttonText = this.authService.getUserName();
        }
    }
}
