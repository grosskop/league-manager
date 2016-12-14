import { FixtureLoader } from './FixtureLoader';
import { FixtureEditor } from './FixtureEditor';

export class AdminConsoleApp {
  private fixtureFilePath = '../src/assets/fixtures.json';

  public run() {
    let loader = new FixtureLoader(this.fixtureFilePath);
    loader.load();
    let editor = new FixtureEditor(this.fixtureFilePath, loader.fixtures, loader.getNextMatchNumber());
  }
}
