import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Fixture } from './fixture';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class FixtureLoaderService {

  private _fixturesLoadedSource = new Subject<Fixture[]>();
  fixturesLoaded$ = this._fixturesLoadedSource.asObservable();

  constructor(private http: Http) {

  }

  loadFixtures() {
    return this.http.request('/assets/fixtures.json')
      .map<Fixture[]>(res => (<Fixture[]>res.json())
      // .map(fix => {
      //   let x = new Fixture(fix.teamA, fix.teamB);
      //   if (fix.goalsA) {
      //     x.goalsA = fix.goalsA;
      //     x.goalsB = fix.goalsB;
      //   }
      //   return x;
      // })
      );
  }
}
