import { Component, OnInit, Input } from '@angular/core';
import { Fixture } from '../fixture';

import { TableCalculatorService } from '../table-calculator.service';
import { FixtureGeneratorService } from '../fixture-generator.service';

@Component({
  selector: 'lm-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit {

  fixtures: Fixture[] = [];

  filteredFixtures: Fixture[];

  constructor(private tableCalculator: TableCalculatorService, private fixtureGenerator: FixtureGeneratorService) {
    fixtureGenerator.fixturesGenerated$.subscribe(fixtures => {
      this.fixtures = fixtures;
      console.log('New fixtures: ' + JSON.stringify(fixtures));
      this.filteredFixtures = this.fixtures;
      this.tableCalculator.updateTable(this.fixtures);
    });
    console.log('Generating fixtures...');
  }

  ngOnInit() {
    this.fixtureGenerator.generateFixtures();
  }

  @Input() set searchTerm(searchTerm: string) {
    this.filterFixtures(searchTerm);
  }

  filterFixtures(term: string) {
    if (term === null) {
      this.filteredFixtures = this.fixtures;
    } else {
      let upperTerm = term.toUpperCase();
      this.filteredFixtures = this.fixtures.filter(fix =>
        fix.teamA.toUpperCase().includes(upperTerm)
        || fix.teamB.toUpperCase().includes(upperTerm));
    }
  }

  onFixtureChange() {
    console.log('change!');
    this.tableCalculator.updateTable(this.fixtures);
  }
}
