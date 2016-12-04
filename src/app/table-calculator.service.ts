import { Injectable } from '@angular/core';
import { TableEntry } from './table-entry';

@Injectable()
export class TableCalculatorService {

  constructor() { }

  calculateTable() {
    let entries = [
      new TableEntry('Hans', 3, 1, 4, 4, 2),
      new TableEntry('Simon', 2, 4, 1, 1, 4),
      new TableEntry('Georg', 11, 2, 0, 20, 0),
      new TableEntry('Sebastian', 0, 0, 14, 0, 15)
    ];
    return entries.sort((a, b) => b.points - a.points);
  }
}
