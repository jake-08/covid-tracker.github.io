import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CovidData } from 'src/app/Model/covid-data';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  todayDate:Date = new Date();
  loadedGlobalData =  {} as CovidData;

  constructor(private DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.fetchGlobalData().subscribe(
      globalData => {
        this.loadedGlobalData = globalData;
      }
    );
  }

}
