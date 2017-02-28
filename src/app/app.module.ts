import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { FixtureListComponent } from './components/fixture-list/fixture-list.component';
import { TableComponent } from './components/table/table.component';
import { LeagueOverviewComponent } from './components/league-overview/league-overview.component';
import { TableCalculatorService } from './services/table-calculator.service';
import { FixtureGeneratorService } from './services/fixture-generator.service';
import { FixtureService } from './services/fixture.service';
import { S3ManagerService } from './services/s3-manager-service';

@NgModule({
  declarations: [
    AppComponent,
    FixtureListComponent,
    TableComponent,
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
    S3ManagerService,
    {
      provide: APP_INITIALIZER,
      useFactory: initFixtureService,
      deps: [FixtureService, AuthModule],
      multi: true
    },
    {
      provide: APP_BASE_HREF, useValue: environment.baseUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initFixtureService(fixtureService: FixtureService) {
  return () => fixtureService.init();
}
