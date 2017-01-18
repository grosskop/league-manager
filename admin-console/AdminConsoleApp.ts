import { FixtureLoader } from './FixtureLoader';
import { FixtureEditor } from './FixtureEditor';
import * as readline from 'readline';

export class AdminConsoleApp {
  private fixtureFilePath = '../src/assets/fixtures.json';

  public run() {

    let loader = new FixtureLoader(this.fixtureFilePath);
    loader.load();
    let editor = new FixtureEditor(this.fixtureFilePath, loader.fixtures, loader.getNextMatchNumber());

    let rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt('Enter match: ');
    rl.prompt();
    rl.on('line', (line: string) => {
      if (line === 'exit') {
        rl.close();
      }
      let values = line.split(',');
      editor.finalizeMatch(values[0], values[1], Number.parseInt(values[2]), Number.parseInt(values[3]));
      editor.save();
      rl.prompt();
    }).on('close', function () {
      process.exit(0);
    });
  }
}
