import * as fs from 'fs';
import { Fixture } from '../src/app/fixture';

export class FixtureLoader {
  public fixtures: Fixture[];

  constructor(private filePath: string) {}

  public load() {
    let fixturesJson = fs.readFileSync(this.filePath, 'utf8');
    this.fixtures = JSON.parse(fixturesJson);
  }

  public getNextMatchNumber() {
    let matchNumbers = this.fixtures.map(fix => fix.matchNumber || 0  );
    let previousMax: number = Math.max.apply(null, matchNumbers);
    return ++previousMax;
  }

  private onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  public getPlayersList() {
    return this.fixtures.map(fix => fix.teamA).filter(this.onlyUnique);
  }
}
