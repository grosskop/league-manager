import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { TableEntry } from './table-entry';
import { Fixture } from './fixture';
import { FixtureService } from './fixture-loader.service';
import * as _ from 'lodash';

@Injectable()
export class TableCalculatorService {

  private sortOptions$ = new BehaviorSubject<SortOptions>(null);

  constructor(private fixtureLoader: FixtureService) {
  }

  public getTable() {
    return this.fixtureLoader.fixtures$
      .do(fixtures => console.log(`today: ${fixtures.length}`))
      .map(fixtures => this.calculateTable(fixtures))
      .combineLatest(this.sortOptions$, (tableUnsorted, sortOptions) => this.sortTable(tableUnsorted, sortOptions))
      .combineLatest(this.getTableYesterday(), (today, yesterday) => this.setMovement(today, yesterday));
  }

  public getTableYesterday() {
    return this.fixtureLoader.fixtures$
      .map(fixtures => {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        console.log(yesterday);
        return _.filter(fixtures, fix => fix.dateEntered == null || new Date(fix.dateEntered) <= yesterday);
      })
      .do(fixtures => console.log(`yesterday: ${fixtures.length}`))
      .map(fixtures => this.calculateTable(fixtures))
      .combineLatest(this.sortOptions$, (tableUnsorted, sortOptions) => this.sortTable(tableUnsorted, sortOptions));
  }

  private calculateTable(fixtures: Fixture[]) {
    let map = new Map<string, TableEntry>();
    for (let fixture of fixtures) {
      this.ensureEntry(map, fixture.teamA);
      this.ensureEntry(map, fixture.teamB);
      if (!Fixture.isComplete(fixture)) {
        continue;
      }
      let result: number;
      if (fixture.goalsA > fixture.goalsB) {
        result = 1;
      } else if (fixture.goalsA < fixture.goalsB) {
        result = -1;
      } else {
        result = 0;
      }
      let oldEntryA = map.get(fixture.teamA);
      map.set(fixture.teamA, new TableEntry(
        oldEntryA.playerName,
        (result > 0 ? oldEntryA.wins + 1 : oldEntryA.wins),
        (result === 0 ? oldEntryA.draws + 1 : oldEntryA.draws),
        (result < 0 ? oldEntryA.losses + 1 : oldEntryA.losses),
        +oldEntryA.goalsScored + +fixture.goalsA,
        +oldEntryA.goalsConceded + +fixture.goalsB));

      let oldEntryB = map.get(fixture.teamB);
      map.set(fixture.teamB, new TableEntry(
        oldEntryB.playerName,
        (result < 0 ? oldEntryB.wins + 1 : oldEntryB.wins),
        (result === 0 ? oldEntryB.draws + 1 : oldEntryB.draws),
        (result > 0 ? oldEntryB.losses + 1 : oldEntryB.losses),
        +oldEntryB.goalsScored + +fixture.goalsB,
        +oldEntryB.goalsConceded + +fixture.goalsA));
    }
    return Array.from(map.values());
  }

  private sortTable(table: TableEntry[], sortOptions: SortOptions) {
    if (sortOptions == null || sortOptions.criteria == null) {
      return _.orderBy(table, ['points', 'goalDifference', 'goalsScored', 'playerName'], ['desc', 'desc', 'desc', 'asc']);
    }
    return _.orderBy(table, [sortOptions.criteria], [sortOptions.ascending ? 'asc' : 'desc']);
  }

  private ensureEntry(entries: Map<string, TableEntry>, player: string) {
    if (!entries.has(player)) {
      entries.set(player, new TableEntry(player, 0, 0, 0, 0, 0));
    }
  }

  private setMovement(tableToday: TableEntry[], tableYesterday: TableEntry[]) {
    tableToday.forEach((entry, index) => {
      let indexYesterday = tableYesterday.findIndex(x => x.playerName === entry.playerName);
      tableToday[index].movement = null;
      if (index < indexYesterday) {
        tableToday[index].movement = 'up';
      } else if (index > indexYesterday) {
        tableToday[index].movement = 'down';
      }
    });
    return tableToday;
  }

  public sortBy(criteria: string, ascending: boolean) {
    let sortOptions = { criteria: criteria, ascending: ascending };
    this.sortOptions$.next(sortOptions);
  }
}

class SortOptions {
  criteria: string;
  ascending: boolean;
}
