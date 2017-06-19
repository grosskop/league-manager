import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
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

  public buttonClicked$ = new Subject<Event>();
  public hovering$ = new BehaviorSubject<boolean>(false);

  public buttonText$: Observable<string>;
  public loginVisible$: Observable<boolean>;
  loggedIn = false;
  loggingIn = false;
  loginFailed = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe(
      user => {
        if (user != null) {
          this.loggedIn = true;
        }
      });
    this.buttonText$ = this.getButtonText();
    this.loginVisible$ =
      this.buttonClicked$.combineLatest(this.authService.user$, (a, b) => b)
        .map(user => user == null);
    this.buttonClicked$
      .switchMap(() => this.authService.isLoggedIn())
      .filter(loggedIn => !loggedIn)
      .subscribe(
      () => {
        this.authService.logIn(this.username, this.password).subscribe(
          () => {
            console.log('login succeeded!');
          },
          err => {
            console.error(err);
            this.loggingIn = false;
            this.loginFailed = true;
            // this.buttonText = 'Whoops!';
          }
        );
      },
      err => console.error(err)
      );

    this.buttonClicked$
      .switchMap(() => this.authService.isLoggedIn())
      .do(x => console.log(x))
      .filter(loggedIn => loggedIn)
      .subscribe(
      () => {
        console.log('yarp');
        this.authService.logOut();
      },
      err => console.error(err)
      );
  }

  getButtonText() {
    return this.hovering$
      .combineLatest(this.authService.user$, (hovering, user) => ({ hovering, user }))
      .map(data => {
        if (data.hovering && data.user != null) {
          return 'Logout';
        } else if (data.user != null) {
          return data.user.username;
        }
        return 'Login';
      });
  }

  userClicked() {
    if (this.loggedIn) {
      this.authService.logOut();
      this.loggedIn = false;
      // this.buttonText$ = 'Login';
      // } else if (!this.loginVisible) {
      // this.loginVisible = true;
      // this.buttonText = 'Go for it';
    } else {
      this.loginFailed = false;
      this.loggingIn = true;
      // this.buttonText = 'Go for it';
    }
  }
}
