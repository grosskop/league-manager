import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private username: string;
    private password: string;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
    }

    submit(event: Event) {
        event.preventDefault();
        this.authService.logIn(this.username, this.password).subscribe(
            () => {
                console.log('login succeeded!');
                this.router.navigate(['']);
            },
            err => console.log(err)
        );
    }
}
