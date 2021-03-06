import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TableCalculatorService } from '../../services/table-calculator.service';
import { TableEntry } from '../../models/table-entry';
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
  private sortAscending = true;
  private subscription: Subscription;

  @Input() searchTerm: string;
  @Output() selectedPlayerChanged = new EventEmitter();

  constructor(private tableCalculator: TableCalculatorService) {
    this.subscription = tableCalculator.getTable().subscribe(
      entries => {
        this.sortedTableEntries = entries;
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
    if (criteria === 'points') {
      this.sortAscending = false;
    } else if (criteria === this.sortCriteria) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortAscending = false;
    }
    this.sortCriteria = criteria;
    this.tableCalculator.sortBy(this.sortCriteria, this.sortAscending);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
