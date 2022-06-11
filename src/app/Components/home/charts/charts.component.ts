import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CaseData, GlobalGraphData } from 'src/app/Model/global-graph';
import { DataService } from 'src/app/Services/data.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnInit {
  isLoading: boolean = false;

  loadedChartData =  {} as GlobalGraphData;

  loadedCasesDate:string[] = [];
  loadedDeathsDate:string[] = [];

  loadedCasesData:number[] = [];
  loadedDeathsData:number[] = [];

  accumulatedCasesChart: Chart | any;
  accumulatedDeathsChart: Chart | any;
  
  constructor(private dataService: DataService) { 
    Chart.register(...registerables);
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.dataService.fetchGlobalDataLast30Days()
      .subscribe((globalData) => {
        this.loadedChartData = globalData;
        const cases: {} = this.loadedChartData.cases;
        const deaths: {} = this.loadedChartData.deaths;
        for(const [key, value] of Object.entries(cases) as any) {
          this.loadedCasesDate.push(new Date(key).toLocaleDateString('en-GB'));
          this.loadedCasesData.push(value);
        }
        for(const [key, value] of Object.entries(deaths) as any) {
          this.loadedDeathsDate.push(new Date(key).toLocaleDateString('en-GB'));
          this.loadedDeathsData.push(value);
        }
        this.createAccumulatedCasesChart();
        this.createAccumulatedDeathsChart();
        this.isLoading = false;
      })
  }

  createAccumulatedCasesChart() {
    this.accumulatedCasesChart = new Chart('accumulatedCases', {
      type: 'line',
      data: {
        labels: this.loadedCasesDate,
        datasets: [
          {
            label: 'Accumulated Cases',
            data: this.loadedCasesData,
            borderWidth: 3,
            fill: false,
            borderColor: '#ffc107',
            backgroundColor: 'steelblue',
          }, 
        ]
      }, 
      options: {
        scales: {
          y: {
            ticks: {
                callback: function(value: any, index, ticks) {
                  return (value/1000000).toString().concat(' ', 'M');
                }
            }
        }
        }
      }
    })
  }

  createAccumulatedDeathsChart() {
    this.accumulatedDeathsChart = new Chart('accumulatedDeaths', {
      type: 'line',
      data: {
        labels: this.loadedDeathsDate,
        datasets: [
          {
            label: 'Accumulated Deaths',
            data: this.loadedDeathsData,
            borderWidth: 3,
            fill: false,
            borderColor: '#dc3545',
            backgroundColor: 'steelblue',
          }, 
        ]
      }, 
      options: {
        scales: {
          y: {
            ticks: {
                callback: function(value: any, index, ticks) {
                    return (value/1000000).toString().concat(' ', 'M');
                }
            }
        }
        }
      }
    })
  }
}
