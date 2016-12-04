import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ResultListComponent } from './results/result-list/result-list.component';
import { FixtureSearchComponent } from './results/fixture-search/fixture-search.component';
import { TableComponent } from './table/table.component';
import { TableCalculatorService } from './table-calculator.service';

@NgModule({
  declarations: [
    AppComponent,
    ResultListComponent,
    FixtureSearchComponent,
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
