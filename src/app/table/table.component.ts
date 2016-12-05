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
  private subscription: Subscription;

  @Input() searchTerm: string;
  @Output() selectedPlayerChanged = new EventEmitter();

  constructor(private tableCalculator: TableCalculatorService) {
    this.subscription = tableCalculator.entriesUpdated$.subscribe(
      entries => this.sortedTableEntries = entries);
  }

  ngOnInit() {

  }

  isHighlighted(playerName: string) {
    if(!this.searchTerm){
      return false;
    }
    return playerName.toUpperCase().includes(this.searchTerm.toUpperCase());
  }

  selectPlayer(playerName: string) {
    if(playerName === this.selectedPlayer) {
      this.selectedPlayer = null;
    } else {
      this.selectedPlayer = playerName;
    }
    this.selectedPlayerChanged.emit(this.selectedPlayer);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
