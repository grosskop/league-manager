import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FixtureListComponent } from './fixture-list/fixture-list.component';
import { TableComponent } from './table/table.component';
import { TableCalculatorService } from './table-calculator.service';
import { FixtureGeneratorService } from './fixture-generator.service';
import { FixtureLoaderService } from './fixture-loader.service';

@NgModule({
  declarations: [
    AppComponent,
    FixtureListComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TableCalculatorService,
    FixtureGeneratorService,
    FixtureLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
