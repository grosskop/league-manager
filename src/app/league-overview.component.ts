import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lm-league-overview',
  templateUrl: './league-overview.component.html',
  styleUrls: ['./league-overview.component.css']
})
export class LeagueOverviewComponent implements OnInit {
  searchTerm = '';
  username: string;

  title = 'African Championships';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUserName();
    console.log('username: ' + this.username);
  }
}
