import {Component, OnInit, Input} from '@angular/core';
import {Fixture} from '../fixture';

import {TableCalculatorService} from '../table-calculator.service';
import {FixtureLoaderService} from '../fixture-loader.service';
import {FixtureResult} from '../fixture-result';

@Component({
  selector: 'lm-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit {

  fixtures: Fixture[] = [];

  filteredFixtures: Fixture[];

  constructor(private tableCalculator: TableCalculatorService, private fixtureLoader: FixtureLoaderService) {
    this.fixtureLoader.loadFixtures().subscribe(fixtures => {
      this.fixtures = this.filteredFixtures = fixtures;
      this.filterFixtures(null);
      this.sortFixtures();
    });
  }

  ngOnInit() {
  }

  @Input() set searchTerm(searchTerm: string) {
    this.filterFixtures(searchTerm);
    this.sortFixtures();
  }

  filterFixtures(term: string) {
    if (term === null) {
      this.filteredFixtures = this.fixtures;
    } else {
      this.filteredFixtures = this.fixtures.filter(fix => fix.teamA === term || fix.teamB === term);
    }
    this.filteredFixtures = this.filteredFixtures.filter(fix => Fixture.isComplete(fix));
  }

  sortFixtures() {
    this.filteredFixtures = this.filteredFixtures.sort((a, b) => {
      if (a.matchNumber > b.matchNumber) {
        return -1;
      }
      if (b.matchNumber > a.matchNumber) {
        return 1;
      }
      return 0;
    });
  }

  public isWin(fixture: Fixture) {
    if(!this.searchTerm || !Fixture.isComplete(fixture))
      return false;
    let result = Fixture.getResult(fixture, this.searchTerm);
    console.log(result);
    return result === FixtureResult.Win;
  }

  onFixtureChange() {
    this.tableCalculator.updateTable(this.fixtures);
  }
}
