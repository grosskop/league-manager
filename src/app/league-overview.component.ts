import { Component } from '@angular/core';

@Component({
  selector: 'lm-league-overview',
  templateUrl: './league-overview.component.html',
  styleUrls: ['./league-overview.component.css ']
})
export class LeagueOverviewComponent {
  searchTerm: string = '';

  title = 'African Championships';
}
