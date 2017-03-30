import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-food-report',
  templateUrl: './food-report.component.html',
  styleUrls: ['./food-report.component.css']
})
export class FoodReportComponent implements OnInit {

  constructor(public parentRouter : Router) {
  }

  ngOnInit() {
  }
  logout(){
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    })
  }
}
