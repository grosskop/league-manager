import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lm-fixture-search',
  templateUrl: './fixture-search.component.html',
  styleUrls: ['./fixture-search.component.css']
})
export class FixtureSearchComponent implements OnInit {

  @Output() termChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  valueChange(term) {
    this.termChanged.emit(term);
    console.log(`key ${term}`);
  }
}
