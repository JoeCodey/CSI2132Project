import { Component, OnInit } from '@angular/core';
import {MealsService} from "../../services/meals.service";

@Component({
  selector: 'app-order-meal',
  templateUrl: './order-meal.component.html',
  styleUrls: ['./order-meal.component.css']
})
export class OrderMealComponent implements OnInit {
  meals : any = [];
  constructor(private mealsService : MealsService) {
    let errorHandler = (err) => {
      console.error(err);
    };
    let successHandler = (data) => {
      this.meals = data;
      for (let meal of this.meals){
        meal.count = 0;
        meal.selected = false;
      }
    };
    this.mealsService.listMeals().subscribe(successHandler, errorHandler);
  }

  public selectMeal(meal : any){
    meal.selected = true;
    meal.count = 1;
  }
  public deselectMeal(meal : any){
    meal.selected = false;
    meal.count = 0;
  }
  public decrementMeal(meal : any){
    if (meal.count <= 1){
      return;
    }
    meal.count--;
  }
  public incrementMeal(meal : any){
    if (meal.count == meal.available_meals){
      return;
    }
    meal.count++;
  }
  public getSelectedMeals() : [any]{
    return this.meals.filter((item) => {return item.selected === true});
  }
  public getDeselectedMeals() : [any]{
    return this.meals.filter((item) => {return item.selected === false});
  }
  public getSelectionCount() : number{
    return this.getSelectedMeals().length;
  }
  public getTotalPrice() : number{
    let selectedItems = this.getSelectedMeals();
    let sum = 0;
    for (let item of selectedItems){
      sum += item.price * item.count;
    }
    return sum;
  }
  public checkout(){

  }

  ngOnInit() {
  }

}
