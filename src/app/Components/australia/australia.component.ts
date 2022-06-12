import { Component, OnInit } from '@angular/core';
import { CountryDetail } from 'src/app/Model/country-detail';
import { CovidData } from 'src/app/Model/covid-data';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-australia',
  templateUrl: './australia.component.html',
  styleUrls: ['./australia.component.scss']
})
export class AustraliaComponent implements OnInit {
  todayDate:Date = new Date();
  loadedAustraliaData =  {} as CovidData;
  isLoading: boolean = false;

  todayTotalCase: CountryDetail[] = [];
  yesterdayTotalCase: CountryDetail[] = [];
  todayCase: CountryDetail[] = [];
  filterBy: string = "";
  filteredTodayCase: CountryDetail[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataService.fetchAustraliaData()
      .subscribe(
        australiaData => {
          this.loadedAustraliaData = australiaData;
        }
      )
    
    this.dataService.fetchAustraliaDataByState()
      .subscribe(
        australiaDataByState => {
          // Get Today and Yesterday Date
          let todayDate = (new Date()).toDateString();
          let yesterdayDate = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date).toDateString();

          // Get Today and Yesterday Data
          for (let i = australiaDataByState.length - 1; i >= 0; i--) {
            let dataDate = new Date(australiaDataByState[i]['Date']).toDateString();
            if (todayDate == dataDate) {
              this.todayTotalCase.push(australiaDataByState[i]);
            } else if (yesterdayDate == dataDate){
              this.yesterdayTotalCase.push(australiaDataByState[i]);
            } else {
              break;
            }
          }

          // Sort the Array By State for Easier Calculation
          this.todayTotalCase.sort((a: any,b: any) => a.Province.localeCompare(b.Province))
          this.yesterdayTotalCase.sort((a: any,b: any) => a.Province.localeCompare(b.Province))
          
          // Loop and get today case only
          for (let i = 0; i < this.todayTotalCase.length; i++) {
            var todayDetail =  {} as CountryDetail;
            todayDetail.Confirmed = this.todayTotalCase[i]['Confirmed'] - this.yesterdayTotalCase[i]['Confirmed'];
            todayDetail.Deaths = this.todayTotalCase[i]['Deaths'] - this.yesterdayTotalCase[i]['Deaths'];
            todayDetail.Active = this.todayTotalCase[i]['Active'];
            todayDetail.Province = this.todayTotalCase[i]['Province'];
            this.todayCase.push(todayDetail);
          }
          
          this.filteredTodayCase = this.todayCase;
          this.isLoading = false;
        }
      )
  }

  filter() {
    this.filteredTodayCase = this.todayCase.filter(todayData => todayData.Province.toLowerCase().includes(this.filterBy.toLowerCase()));
  }

}
