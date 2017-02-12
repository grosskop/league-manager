import { S3ManagerService } from './services/s3-manager-service';
import { ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Fixture } from './fixture';
import * as _ from 'lodash';

@Injectable()
export class FixtureService {

  public fixtures$ = new ReplaySubject<Fixture[]>(1);
  private fixtures: Fixture[];

  constructor(private http: Http, private s3: S3ManagerService) {
  }

  init() {
    this.loadFixtures()
      .subscribe(
      fixtures => {
        this.fixtures = fixtures;
        this.fixtures$.next(fixtures);
      },
      err => console.error(err)
      );
  }

  public updateFixtures(fixtures: Fixture[]) {
    this.fixtures = fixtures;
    this.s3.uploadFile('fixtures.json', JSON.stringify(fixtures)).subscribe(
      null, null,
      () => console.log('upload complete')
    );
    this.fixtures$.next(fixtures);
  }

  public updateResult(fixture: Fixture) {
    const index = _.findIndex(this.fixtures, x => x.teamA === fixture.teamA && x.teamB === fixture.teamB);
    const newFixtures = this.fixtures.splice(index, 1, fixture);
    console.log(newFixtures);
    this.updateFixtures(newFixtures);
  }

  private loadFixtures() {
    return this.s3.downloadFile('fixtures.json')
      .map(response => JSON.parse(response));
  }
}
