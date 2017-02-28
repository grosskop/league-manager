import { Observable } from 'rxjs/Rx';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fixture } from '../../models/fixture';
import { FixtureResult } from '../../models/fixture-result';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'lm-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit {

  @Input() public fixtures: Fixture[];
  @Input() public searchTerm: string = null;
  @Input() public title: string;
  @Output() public fixtureChanged = new EventEmitter<Fixture>();

  public isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isAdmin$ = this.authService.user$.map(user => user == null ? false : user.isAdmin);
  }

  public isResult(fixture, result: string) {
    if (!this.searchTerm || !fixture.isComplete()) {
      return false;
    }
    let actualResult = fixture.getResult(this.searchTerm);
    return actualResult === FixtureResult[result];
  }
}
