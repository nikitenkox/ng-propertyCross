import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { InitialStateComponent } from './components/initial-state/initial-state.component';
import { ErrorStateComponent } from './components/error-state/error-state.component';
import { ListedLocationsStateComponent } from './components/listed-locations-state/listed-locations-state.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { DetailsComponent } from './components/details/details.component';

import { PropertyService } from './services/property.service';

import { AppRoutingModule } from './routes/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    JsonpModule
    ],
  declarations: [
    AppComponent,
    SearchFormComponent,
    InitialStateComponent,
    ErrorStateComponent,
    ListedLocationsStateComponent,
    SearchResultsComponent,
    ResultItemComponent,
    FavouritesComponent,
    DetailsComponent
  ],
  bootstrap: [AppComponent],
  providers: [PropertyService]
})
export class AppModule { }
