import { Component, OnInit } from '@angular/core';
import { Fixture } from '../fixture';

@Component({
  selector: 'lm-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

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

  filterFixtures(term: string) {
    console.log('filter by ${term}');
    let upperTerm = term.toUpperCase();
    this.filteredFixtures = this.fixtures.filter(fix =>
      fix.teamA.toUpperCase().includes(upperTerm)
      || fix.teamB.toUpperCase().includes(upperTerm));
  }
}
