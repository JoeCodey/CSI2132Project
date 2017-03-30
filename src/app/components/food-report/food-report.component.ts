import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AdminService} from "../../services/admin.service";


@Component({
  selector: 'app-food-report',
  templateUrl: './food-report.component.html',
  styleUrls: ['./food-report.component.css']
})
export class FoodReportComponent implements OnInit {
  public topThreeUsed : any = [];
  public mostExpensiveMeal : any;
  public mostOrderedMeals : any = [];
  constructor(public parentRouter : Router, public adminService : AdminService) {
    this.adminService.getMostExpensiveMeal().subscribe(data => {
      if (data[0]){
        this.mostExpensiveMeal = data[0];
      }
    }, err => console.error(err));

    this.adminService.listTopThreeFoods().subscribe(data => {
      this.topThreeUsed = data;
    }, err => console.error(err));

    this.adminService.listMostOrdered().subscribe(data => {
      this.mostOrderedMeals = data;
    }, err => console.error(err));
  }

  ngOnInit() {
  }
}
