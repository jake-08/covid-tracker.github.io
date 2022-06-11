import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/shared/header/header.component';
import { AustraliaComponent } from './Components/australia/australia.component';
import { HomeComponent } from './Components/home/home.component';
import { CountriesComponent } from './Components/countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { ContinentsComponent } from './Components/continents/continents.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './Components/shared/page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './Components/shared/loading-spinner/loading-spinner.component';
import { ChartsComponent } from './Components/home/charts/charts.component';
import { FooterComponent } from './Components/shared/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AustraliaComponent,
    HomeComponent,
    CountriesComponent,
    ContinentsComponent,
    PageNotFoundComponent,
    LoadingSpinnerComponent,
    ChartsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
