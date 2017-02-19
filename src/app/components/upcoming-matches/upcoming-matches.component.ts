import { AuthService } from '../../auth/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fixture } from '../../fixture';

@Component({
  selector: 'lm-upcoming-matches',
  templateUrl: './upcoming-matches.component.html',
  styleUrls: ['./upcoming-matches.component.css']
})
export class UpcomingMatchesComponent implements OnInit {

  @Input() public fixtures: Fixture[];
  @Input() public searchTerm: string = null;
  @Output() public fixtureChanged = new EventEmitter<Fixture>();
  public isAdmin = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isAdmin = this.authService.isUserAdmin();
  }
}
