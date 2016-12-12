import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Fixture } from './fixture';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class FixtureLoaderService {

  private fixtures: Fixture[];
  private observable: Observable<Fixture[]>;

  constructor(private http: Http) { }

  loadFixtures() {
    if (this.fixtures) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.fixtures);
    } else if (this.observable) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.observable;
    } else {
      // create the request, store the `Observable` for subsequent subscribers
      this.observable = this.http.request(environment.fixturesUrl)
        .map(response => {
          // when the cached data is available we don't need the `Observable` reference anymore
          this.observable = null;

          this.fixtures = response.json();
          return this.fixtures;
        })
        // make it shared so more than one subscriber can get the result
        .share();
      return this.observable;
    }
  }
}
