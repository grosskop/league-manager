import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Fixture } from '../fixture';

import { TableCalculatorService } from '../table-calculator.service';
import { FixtureService } from '../fixture.service';

@Component({
  selector: 'lm-upcoming-matches',
  templateUrl: './upcoming-matches.component.html',
  styleUrls: ['./upcoming-matches.component.css']
})
export class UpcomingMatchesComponent implements OnInit {

  public fixtures$: Observable<Fixture[]>;
  public searchTerm$ = new BehaviorSubject<string>(null);

  constructor(private tableCalculator: TableCalculatorService, private fixtureService: FixtureService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.searchTerm$.next(null);
    this.fixtures$ = this.fixtureService.fixtures$
      .combineLatest(this.searchTerm$, (fixtures, searchTerm) => { return { fixtures, searchTerm }; })
      .map(data => this.filterFixtures(data.fixtures, data.searchTerm));
  }

  @Input() set searchTerm(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  filterFixtures(fixtures: Fixture[], term: string) {
    let result: Fixture[];
    if (term === null) {
      result = fixtures;
    } else {
      result = fixtures.filter(fix => fix.teamA === term || fix.teamB === term);
    }
    return result.filter(fix => !Fixture.isComplete(fix));
  }

  onFixtureChange(fixture: Fixture) {
    this.fixtureService.updateResult(fixture);
  }
}
