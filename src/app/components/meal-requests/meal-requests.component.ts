import { Component, OnInit } from '@angular/core';
import {MealsService} from "../../services/meals.service";


@Component({
  selector: 'app-meal-requests',
  templateUrl: './meal-requests.component.html',
  styleUrls: ['./meal-requests.component.css']
})
export class MealRequestsComponent implements OnInit {
  public mealRequests : Array<any> = [];
  constructor(private mealsService: MealsService) {
    let successHandler = (data) => {
      this.mealRequests = data;
    };
    let errorHandler = (err) => {
      console.error(err);
    };
    this.mealsService.listAllMealRequests().subscribe(successHandler, errorHandler);
  }

  public getActiveRequests(){
    console.log(this.mealRequests);
    return this.mealRequests.filter((item) => {return item.active === true;});
  }

  ngOnInit() {
  }

}
