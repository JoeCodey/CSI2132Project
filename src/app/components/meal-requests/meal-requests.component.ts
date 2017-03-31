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
    return this.mealRequests.filter((item) => {return item.active === true;});
  }

  public serveMealRequest(id: number){
    let that = this;
    this.mealsService.deactivateMealRequest(id).subscribe(
      (data) => {
        console.log(data['Message']);
        for(let request of that.mealRequests){
          if(request.order_num === id){
            request.active = false;
          }
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
  }

}
