import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lm-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {

  @Output() termChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  valueChange(term) {
    this.termChanged.emit(term);
  }
}
