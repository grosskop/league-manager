import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableCalculatorService } from '../table-calculator.service';
import { TableEntry } from '../table-entry';

@Component({
  selector: 'lm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private sortedTableEntries: TableEntry[];
  private selectedPlayer: string;

  @Input() searchTerm: string;
  @Output() selectedPlayerChanged = new EventEmitter();

  constructor(private tableCalculator: TableCalculatorService) {
    this.sortedTableEntries = tableCalculator.calculateTable();
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
}
