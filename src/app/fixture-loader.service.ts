import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Fixture } from './fixture';
import { Subject } from 'rxjs';

@Injectable()
export class FixtureLoaderService {

  private _fixturesGeneratedSource = new Subject<Fixture[]>();
  fixturesGenerated$ = this._fixturesGeneratedSource.asObservable();

  constructor(private http: Http) {

  }

  loadFixtures() {
    return this.http.request('/assets/fixtures.json')
      .map<Fixture[]>(res => res.json());
  }
}
