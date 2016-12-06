import { Injectable } from '@angular/core';
import { Fixture } from './fixture';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';

@Injectable()
export class FixtureGeneratorService {

  private _fixturesGeneratedSource = new Subject<Fixture[]>();
  fixturesGenerated$ = this._fixturesGeneratedSource.asObservable();

  constructor(private http: Http) {

  }

  loadPlayers() {
    return this.http.request('/assets/players.json')
      .map<string[]>(res => res.json());
  }

  generateFixtures() {
    this.loadPlayers().subscribe(players => {
      console.log("loaded players: " + players);
      let sortedNames = players.sort();
      let newFixtures: Fixture[] = [];
      for (let name1 of sortedNames) {
        for (let name2 of sortedNames.slice().reverse()) {
          if (name1 !== name2) {
            newFixtures.push(new Fixture(name1, name2));
          }
        }
      }
      console.log('new fixtures: ' + newFixtures);
      this._fixturesGeneratedSource.next(newFixtures);
    });
  }
}
