import { FixtureService } from './fixture.service';
import { Fixture } from './fixture';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'lm-league-overview',
  templateUrl: './league-overview.component.html',
  styleUrls: ['./league-overview.component.css']
})
export class LeagueOverviewComponent implements OnInit {
  searchTerm = '';

  public upcomingfixtures$: Observable<Fixture[]>;
  public latestFixtures$: Observable<Fixture[]>;
  public searchTerm$ = new BehaviorSubject<string>(null);

  constructor(private fixtureService: FixtureService) {

  }

  ngOnInit(): void {
    this.searchTerm$.next(null);
    this.upcomingfixtures$ = this.getUpcomingFixtures();
    this.latestFixtures$ = this.getLatestFixtures();
  }

  private getFixtures() {
    return this.fixtureService.fixtures$
      .combineLatest(this.searchTerm$, (fixtures, searchTerm) => { return { fixtures, searchTerm }; })
      .map(data => {
        if (data.searchTerm === null) {
          return data.fixtures;
        } else {
          return data.fixtures.filter(fix => fix.teamA === data.searchTerm || fix.teamB === data.searchTerm);
        }
      })
      .map(fixtures => _.orderBy(fixtures, [(fix) => (fix.dateEntered || new Date(2020))], ['desc']));
  }

  private getUpcomingFixtures() {
    return this.getFixtures()
      .map(fixtures => fixtures.filter(fix => !fix.isComplete()));
  }

  private getLatestFixtures() {
    return this.getFixtures()
      .map(fixtures => fixtures.filter(fix => fix.isComplete()));
  }

  public onFixtureChange(fixture: Fixture) {
    this.fixtureService.updateResult(fixture);
  }
}
