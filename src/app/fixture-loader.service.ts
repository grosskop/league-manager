import { ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Fixture } from './fixture';
import { environment } from '../environments/environment';

@Injectable()
export class FixtureService {

  public fixtures$ = new ReplaySubject<Fixture[]>(1);

  constructor(private http: Http) {
  }

  init() {
    this.loadFixtures()
      .subscribe(
      fixtures => this.fixtures$.next(fixtures),
      err => console.error(err)
      );
  }

  public updateFixtures(fixtures: Fixture[]) {
    this.fixtures$.next(fixtures);
  }

  private loadFixtures() {
    // create the request, store the `Observable` for subsequent subscribers
    return this.http.request(environment.fixturesUrl)
      .map(response => response.json());
  }
}
