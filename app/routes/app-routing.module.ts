import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitialStateComponent } from '../components/initial-state/initial-state.component';
import { FavouritesComponent } from '../components/favourites/favourites.component';
import { SearchResultsComponent } from '../components/search-results/search-results.component';
import { PropertyDetailsComponent } from '../components/details/property-details.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: InitialStateComponent },
  { path: '', component: InitialStateComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'detail/:id', component: PropertyDetailsComponent },
  { path: 'results', component: SearchResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
