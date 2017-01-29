import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    exports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [],
    providers: [],
})
export class SharedModule { }
