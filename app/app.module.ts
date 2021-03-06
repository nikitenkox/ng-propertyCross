import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { InitialStateComponent } from './components/initial-state/initial-state.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { PropertyDetailsComponent } from './components/details/property-details.component';

import { PropertyService } from './services/property.service';

import { AppRoutingModule } from './routes/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    JsonpModule,
    FormsModule
    ],
  declarations: [
    AppComponent,
    SearchFormComponent,
    InitialStateComponent,
    SearchResultsComponent,
    ResultItemComponent,
    FavouritesComponent,
    PropertyDetailsComponent
  ],
  bootstrap: [AppComponent],
  providers: [PropertyService]
})
export class AppModule { }
