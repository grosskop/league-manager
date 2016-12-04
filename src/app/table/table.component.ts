import { Component, OnInit, Input } from '@angular/core';
import { TableCalculatorService } from '../table-calculator.service';
import { TableEntry } from '../table-entry';

@Component({
  selector: 'lm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private sortedTableEntries: TableEntry[];

  @Input() searchTerm: string;

  constructor(private tableCalculator: TableCalculatorService) {
    this.sortedTableEntries = tableCalculator.calculateTable();
  }

  ngOnInit() {

  }

  isHighlighted(name: string) {
    return name.toUpperCase().includes(this.searchTerm.toUpperCase());
  }
}
