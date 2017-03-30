import { Component, OnInit } from '@angular/core';
import {MealsService} from '../../services/meals.service';

@Component({
  selector: 'app-browse-meals',
  templateUrl: './browse-meals.component.html',
  styleUrls: ['./browse-meals.component.css']
})
export class BrowseMealsComponent implements OnInit {

  meals : any = [];
  constructor(private mealsService : MealsService) {
    let successHandler = (data) => {
      this.meals = data;
    };
    let errorHandler = (err) => {
      console.error(err);
    };
    this.mealsService.listMeals().subscribe(successHandler, errorHandler);
  }

  public deleteMeal(meal: any){
    let that = this;
    this.mealsService.deleteMeal(meal.id).subscribe(
      function(){
        // remove meal from array
        console.log(meal.name + ' deleted.');
        let index = that.meals.indexOf(meal);
        if(index >= 0){
          that.meals.splice(index, 1);
        }
      },
      function(err){console.error(err);}
    );
  }

  ngOnInit() {
  }

}
