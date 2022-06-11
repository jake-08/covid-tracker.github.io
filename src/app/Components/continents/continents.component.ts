import { Component, OnInit } from '@angular/core';
import { CovidData } from 'src/app/Model/covid-data';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss']
})
export class ContinentsComponent implements OnInit {
  todayDate:Date = new Date();
  filterBy: string = "";
  loadedContinentData: CovidData[] = [];
  filteredContinentsData: CovidData[] = [];
  isLoading: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataService.fetchContinentData()
      .subscribe(
        continentData => {
          this.loadedContinentData = continentData;
          this.filteredContinentsData = [...this.loadedContinentData];
          this.isLoading = false;
        }
      );
  }

  filter() {
    this.filteredContinentsData = [...this.loadedContinentData.filter(continentData => continentData.continent?.toLowerCase().includes(this.filterBy.toLowerCase()))];
  }

}
