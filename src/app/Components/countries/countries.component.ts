import { Component, OnInit } from '@angular/core';
import { CovidData } from 'src/app/Model/covid-data';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  todayDate:Date = new Date();
  filterBy: string = "";
  loadedCountryData: CovidData[] = [];
  filteredCountriesData: CovidData[] = [];
  countryFlagLink = [];
  isLoading: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataService.fetchCountryFlag()
      .subscribe(
        countryFlag => {
          this.countryFlagLink = countryFlag;
        }
      );

    this.dataService.fetchCountryData()
      .subscribe(
        countryData => {
          this.loadedCountryData = countryData;
          this.filteredCountriesData = [...this.loadedCountryData];
          this.isLoading = false;
        }
      );
  }

  filter() {
    this.filteredCountriesData = [...this.loadedCountryData.filter(countryData => countryData.country?.toLowerCase().includes(this.filterBy.toLowerCase()))];
  }

}
