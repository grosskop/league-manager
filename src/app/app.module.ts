import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    UpcomingMatchesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TableCalculatorService,
    FixtureGeneratorService,
    FixtureService,
    {
      provide: APP_INITIALIZER,
      useFactory: (fixtureService: FixtureService) => () => fixtureService.init(), deps: [FixtureService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
