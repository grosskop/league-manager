import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { LeagueOverviewComponent } from './league-overview.component';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { FixtureListComponent } from './fixture-list/fixture-list.component';
import { TableComponent } from './table/table.component';
import { TableCalculatorService } from './table-calculator.service';
import { FixtureGeneratorService } from './fixture-generator.service';
import { FixtureService } from './fixture-loader.service';
import { UpcomingMatchesComponent } from './upcoming-matches/upcoming-matches.component';

@NgModule({
  declarations: [
    AppComponent,
    FixtureListComponent,
    TableComponent,
    UpcomingMatchesComponent,
    LeagueOverviewComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    TableCalculatorService,
    FixtureGeneratorService,
    FixtureService,
    {
      provide: APP_INITIALIZER,
      useFactory: initFixtureService,
      deps: [FixtureService],
      multi: true
    },
    {
      provide: APP_BASE_HREF, useValue : environment.baseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initFixtureService(fixtureService: FixtureService) {
  return () => fixtureService.init();
}
