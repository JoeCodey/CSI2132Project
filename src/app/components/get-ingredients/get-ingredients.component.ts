import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../services/food.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {router} from "../../app.router";

@Component({
  selector: 'app-get-ingredients',
  templateUrl: './get-ingredients.component.html',
  styleUrls: ['./get-ingredients.component.css']
})
export class GetIngredientsComponent implements OnInit {
  public ingredients : any = [];
  constructor(public foodService : FoodService, public parentRouter : Router, public activatedRoute : ActivatedRoute) {
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
    this.foodService.listFood().subscribe(successHandler, errorHandler);
  }
  public selectIngredient(ingredient: any){
    let index = this.ingredients.indexOf(ingredient);
    if (index < 0){
      return;
    }
    this.ingredients[index].selected = !this.ingredients[index].selected;
  }
  ngOnInit() {
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
    if (ingredient.count === ingredient.num_of_items){
      return;
    }
    ingredient.count++;
  }
  public decrementItem(ingredient: any){
    if (ingredient.count <= 1){
      return;
    }
    ingredient.count--;
  }
  public getUnselectedIngredients(){
    return this.ingredients.filter((item) => {return item.selected === false});
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


  public checkout(){
    let errorHandler = (err) => {
      console.error(err);
    };
    let successHandler = (success) => {
      console.log('Success');
      this.parentRouter.navigateByUrl('/home-user/checkout-success').catch(err => {
        console.error(err);
      });
    };
    this.foodService.checkout(this.getSelectedIngredients()).subscribe(successHandler, errorHandler);
  }

}
