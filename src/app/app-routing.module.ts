import { LeagueOverviewComponent } from './components/league-overview/league-overview.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', component: LeagueOverviewComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: []
})
export class AppRoutingModule { }
