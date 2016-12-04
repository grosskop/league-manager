import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FixtureListComponent } from './fixture-list/fixture-list.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { TableComponent } from './table/table.component';
import { TableCalculatorService } from './table-calculator.service';

@NgModule({
  declarations: [
    AppComponent,
    FixtureListComponent,
    PlayerSearchComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TableCalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
