import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidData } from '../Model/covid-data';
import { map, Observable } from 'rxjs';
import { CountryDetail } from '../Model/country-detail';
import { GlobalGraphData } from '../Model/global-graph';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient) {}

  fetchGlobalData(): Observable<CovidData> {
    return this.http.get<CovidData>('https://disease.sh/v3/covid-19/all')
  }

  fetchContinentData(): Observable<CovidData[]> {
    return this.http.get<CovidData[]>('https://disease.sh/v3/covid-19/continents');
  }

  fetchCountryFlag(): Observable<any> {
    return this.http
      .get<any>('https://disease.sh/v3/covid-19/countries')
      .pipe(
        map(responseData => responseData
          .map((countries: any) => ({
            countryFlag: countries.countryInfo.flag,
          }))
        )
      );
  }

  fetchCountryData(): Observable<CovidData[]> {
    return this.http.get<CovidData[]>('https://disease.sh/v3/covid-19/countries');
  }

  fetchAustraliaData(): Observable<CovidData> {
    return this.http.get<CovidData>('https://disease.sh/v3/covid-19/countries/Australia');
  }

  fetchAustraliaDataByState(): Observable<CountryDetail[]> {
    return this.http.get<CountryDetail[]>('https://api.covid19api.com/live/country/au');
  }

  fetchGlobalDataLast30Days(): Observable<GlobalGraphData> {
    return this.http.get<GlobalGraphData>('https://disease.sh/v3/covid-19/historical/all?lastdays=30');
  }
}
