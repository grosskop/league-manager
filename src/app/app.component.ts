import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'African Championships';

  username: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUserName();
    console.log('username: ' + this.username);
  }
}
