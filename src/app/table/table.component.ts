import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TableCalculatorService } from '../table-calculator.service';
import { TableEntry } from '../table-entry';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  private sortedTableEntries: TableEntry[];
  private selectedPlayer: string;
  private sortCriteria: string;
  private sortAscending: boolean = true;
  private subscription: Subscription;

  @Input() searchTerm: string;
  @Output() selectedPlayerChanged = new EventEmitter();

  constructor(private tableCalculator: TableCalculatorService) {
    this.subscription = tableCalculator.getTable().subscribe(
      entries => {
        this.sortedTableEntries = entries;
        console.log('new table: ' + JSON.stringify(entries));
      },
      err => console.error(err)
    );
  }

  ngOnInit() {

  }

  isHighlighted(playerName: string) {
    return playerName === this.searchTerm;
  }

  selectPlayer(playerName: string) {
    if (playerName === this.selectedPlayer) {
      this.selectedPlayer = null;
    } else {
      this.selectedPlayer = playerName;
    }
    this.selectedPlayerChanged.emit(this.selectedPlayer);
  }

  sortBy(criteria: string) {
    if (criteria === null) {
      this.sortAscending = true;
    }
    if (criteria === this.sortCriteria) {
      if (this.sortAscending === false) {
        this.sortAscending = true;
      } else {
        this.sortCriteria = null;
      }
    } else {
      this.sortCriteria = criteria;
      this.sortAscending = false;
    }
    this.tableCalculator.sortBy(this.sortCriteria, this.sortAscending);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
