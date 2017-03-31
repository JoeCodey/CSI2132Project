import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../services/food.service";
import {MealsService} from "../../services/meals.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.css']
})
export class NewMealComponent implements OnInit {

  public newMeal : any = {};
  public descriptionMaxLength : number = 130;
  public ingredients : any = [];
  public currentPage : number = 1;
  public itemsPerPage : number = 5;
  public searchString : string = '';
  public nameError : boolean = false;
  constructor(private foodService : FoodService, private mealService: MealsService, private parentRouter : Router) {
    let successHandler = (data) => {
      this.ingredients = data;
      for (let ingredient of this.ingredients){
        ingredient.selected = false;
        ingredient.count = 0;
      }
    };
    let errorHandler = (err) => {
      console.error(err);
    };
    this.foodService.listAllFood().subscribe(successHandler, errorHandler);
  }

  ngOnInit() {
  }
  public remainingCharacters(){
    if (!this.newMeal.description){
      return this.descriptionMaxLength;
    }
    else{
      return this.descriptionMaxLength - this.newMeal.description.length;
    }
  }
  public selectItem(ingredient : any){
    ingredient.selected = true;
    ingredient.count = 1;
    console.log(ingredient.count);
  }
  public deselectItem(ingredient: any){
    ingredient.selected = false;
    ingredient.count = 0;
  }
  public incrementItem(ingredient: any){
    ingredient.count++;
  }
  public decrementItem(ingredient: any){
    if (ingredient.count <= 1){
      return;
    }
    ingredient.count--;
  }
  public totalPageCount(){
    let val = Math.ceil(this.getUnselectedIngredients().length/this.itemsPerPage);
    let arr = [];
    for (let i = 1;i<=val;i++){
      arr.push(i);
    }
    return arr;
  }
  public getPaginatedResults(){
    let unselectedIngredients = this.getUnselectedIngredients();
    let first = (this.currentPage-1) * this.itemsPerPage;
    let last = (this.currentPage * this.itemsPerPage);

    return unselectedIngredients.slice(first, last);
  }
  public getUnselectedIngredients(){
    let modifiedSearchString = this.searchString.trim().toLowerCase();
    return this.ingredients.filter((item) => {
      if (modifiedSearchString.length == 0){
        return item.selected === false;
      }
      else{
        return item.selected === false && item.name.trim().toLowerCase().includes(modifiedSearchString);
      }
    });
  }
  public getSelectedIngredients(){
    return this.ingredients.filter((item) => {return item.selected === true});
  }
  public selectionCount(){
    return this.getSelectedIngredients().length;
  }
  public getTotalPrice(){
    let selectedItems = this.getSelectedIngredients();
    let totalPrice = 0;
    for (let ingredient of selectedItems){
      totalPrice += ingredient.count * ingredient.price_per_item;
    }
    return totalPrice;
  }
  public createMeal(){
    this.mealService.createMeal(this.newMeal, this.getSelectedIngredients()).subscribe(data => {
      console.log(data);
      this.parentRouter.navigateByUrl('/home-chef/meal-info/'+data.id).catch(err =>{
        console.error(err);
      });
    }, err => {
      console.error(err);
      this.nameError = true;
    });
  }
  public resetNameError(){
    this.nameError = false;
  }
}
