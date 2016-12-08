import { Injectable } from '@angular/core';
import { TableEntry } from './table-entry';
import { Fixture } from './fixture';
import { Subject } from 'rxjs';
import { FixtureLoaderService } from './fixture-loader.service';

@Injectable()
export class TableCalculatorService {

  private entriesUpdatedSource = new Subject<TableEntry[]>();

  entriesUpdated$ = this.entriesUpdatedSource.asObservable();

  constructor(private fixtureLoader: FixtureLoaderService) {
    this.fixtureLoader.loadFixtures().subscribe(fixtures => this.updateTable(fixtures));
  }

  updateTable(fixtures: Fixture[]) {
    console.log('update table, fixtures: ' + JSON.stringify(fixtures));
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
        +oldEntryA.goalsConceived + +fixture.goalsB));

      let oldEntryB = map.get(fixture.teamB);
      map.set(fixture.teamB, new TableEntry(
        oldEntryB.playerName,
        (result < 0 ? oldEntryB.wins + 1 : oldEntryB.wins),
        (result === 0 ? oldEntryB.draws + 1 : oldEntryB.draws),
        (result > 0 ? oldEntryB.losses + 1 : oldEntryB.losses),
        +oldEntryB.goalsScored + +fixture.goalsB,
        +oldEntryB.goalsConceived + +fixture.goalsA));
    }
    let entries = Array.from(map.values());
    let entriesSorted = entries.sort(this.sortTable);
    this.entriesUpdatedSource.next(entriesSorted);
  }

  private ensureEntry(entries: Map<string, TableEntry>, player: string) {
    if (!entries.has(player)) {
      entries.set(player, new TableEntry(player, 0, 0, 0, 0, 0));
    }
  }

  private sortTable(a, b) {
    let diffPoints = b.points - a.points;
    if (diffPoints !== 0) {
      return diffPoints;
    }
    let diffGoalDiffs = b.goalDifference - a.goalDifference;
    if (diffGoalDiffs !== 0) {
      return diffGoalDiffs;
    }
    let diffScored = b.goalsScored - a.goalsScored;
    if (diffScored !== 0) {
      return diffScored;
    }
    if (a.playerName > b.playerName) {
      return 1;
    }
    return -1;
  }
}

