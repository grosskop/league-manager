import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fixture } from '../fixture';

import { TableCalculatorService } from '../table-calculator.service';
import { FixtureService } from '../fixture.service';
import { FixtureResult } from '../fixture-result';

@Component({
  selector: 'lm-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit {

  @Input() public fixtures: Fixture[];
  @Input() public searchTerm: string = null;
  @Output() public fixtureChanged = new EventEmitter<Fixture>();

  constructor() {
  }

  ngOnInit() {}

  public isResult(fixture, result: string) {
    if (!this.searchTerm || !fixture.isComplete()) {
      return false;
    }
    let actualResult = fixture.getResult(this.searchTerm);
    return actualResult === FixtureResult[result];
  }
}
