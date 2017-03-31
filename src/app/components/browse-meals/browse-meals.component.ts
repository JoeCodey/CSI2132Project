import { Component, OnInit } from '@angular/core';
import {MealsService} from '../../services/meals.service';
import {FoodService} from "../../services/food.service";

@Component({
  selector: 'app-browse-meals',
  templateUrl: './browse-meals.component.html',
  styleUrls: ['./browse-meals.component.css']
})
export class BrowseMealsComponent implements OnInit {

  meals : any = [];
  ingredients : any = [];

  mealSearchString : string = '';
  mealCurrentPage = 1;
  ingredientSearchString :string = '';
  ingredientCurrentPage = 1;

  itemsPerPage = 10;
  constructor(private mealsService : MealsService, private foodService : FoodService) {
    let successHandler = (data) => {
      this.meals = data;
    };
    let errorHandler = (err) => {
      console.error(err);
    };
    this.mealsService.listAllMeals().subscribe(successHandler, errorHandler);
    successHandler = (data) => {
      this.ingredients = data;
    };
    errorHandler = (err) => {
      console.error(err);
    };
    this.foodService.listAllFood().subscribe(successHandler, errorHandler);
  }

  public getIngredients(){
    return this.ingredients.filter(item => {
      let modifiedSearchString = this.ingredientSearchString.trim().toLowerCase();
      if (modifiedSearchString.length == 0){
        return true;
      }
      else{
        return item.name.trim().toLowerCase().includes(modifiedSearchString);
      }
    });
  }
  public getMeals(){
    return this.meals.filter(item => {
      let modifiedSearchString = this.mealSearchString.trim().toLowerCase();
      if (modifiedSearchString.length == 0){
        return true;
      }
      else{
        return item.name.trim().toLowerCase().includes(modifiedSearchString);
      }
    });
  }
  public totalMealPageCount(){
    let val = Math.ceil(this.getMeals().length/this.itemsPerPage);
    let arr = [];
    for (let i = 1;i<=val;i++){
      arr.push(i);
    }
    return arr;
  }
  public totalIngredientPageCount(){
    let val = Math.ceil(this.getIngredients().length/this.itemsPerPage);
    let arr = [];
    for (let i = 1;i<=val;i++){
      arr.push(i);
    }
    return arr;
  }
  public getPaginatedIngredients(){
    let first = (this.ingredientCurrentPage-1) * this.itemsPerPage;
    let last = (this.ingredientCurrentPage * this.itemsPerPage);

    return this.getIngredients().slice(first, last);
  }
  public getPaginatedMeals(){
    let first = (this.mealCurrentPage-1) & this.itemsPerPage;
    let last = (this.mealCurrentPage * this.itemsPerPage);

    return this.getMeals().slice(first, last);
  }
  ngOnInit() {
  }

}
