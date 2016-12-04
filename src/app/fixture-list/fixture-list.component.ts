import { Component, OnInit, Input } from '@angular/core';
import { Fixture } from '../fixture';

@Component({
  selector: 'lm-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit {

  fixtures = [
    new Fixture('Johannes', 'Markus'),
    new Fixture('Joachim', 'Sebastian'),
    new Fixture('Arne', 'Reiner'),
    new Fixture('Kurt', 'Sören'),
    new Fixture('Patrick', 'Jan'),
  ];

  filteredFixtures: Fixture[];

  constructor() {
    this.filteredFixtures = this.fixtures;
  }

  ngOnInit() { }

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
}
