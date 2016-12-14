import * as fs from 'fs';
import { Fixture } from '../src/app/fixture';

export class FixtureEditor {

  constructor(private filePath: string, private fixtures: Fixture[], private nextMatchNumber: number) { }

  public save() {
    let fixturesJson = JSON.stringify(this.fixtures, null, 2);

    fs.writeFile(this.filePath, fixturesJson, function (err) {
      if (err) { return console.log(err); }
      console.log('writing to ' + this.filePath);
    });
  }
}
