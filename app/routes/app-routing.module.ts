import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitialStateComponent } from '../components/initial-state/initial-state.component';
import { ErrorStateComponent } from '../components/error-state/error-state.component';
import { ListedLocationsStateComponent } from '../components/listed-locations-state/listed-locations-state.component';
import { FavouritesComponent } from '../components/favourites/favourites.component';
import { SearchResultsComponent } from '../components/search-results/search-results.component';
import { DetailsComponent } from '../components/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: InitialStateComponent },
  { path: 'error',  component: ErrorStateComponent },
  { path: 'locations',  component: ListedLocationsStateComponent },
  { path: 'favourites',  component: FavouritesComponent },
  { path: 'detail/:id', component: DetailsComponent },
  { path: 'results',     component: SearchResultsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
