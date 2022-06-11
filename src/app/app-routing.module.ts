import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AustraliaComponent } from './Components/australia/australia.component';
import { ContinentsComponent } from './Components/continents/continents.component';
import { CountriesComponent } from './Components/countries/countries.component';
import { HomeComponent } from './Components/home/home.component';
import { PageNotFoundComponent } from './Components/shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'continents', component: ContinentsComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'australia', component: AustraliaComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
