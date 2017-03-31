import { Component, OnInit } from '@angular/core';
import {IngredientOrderService} from "../../services/ingredient-order.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FoodService} from '../../services/food.service';
import {router} from "../../app.router";

@Component({
  selector: 'app-place-ingredient-order',
  templateUrl: './place-ingredient-order.component.html',
  styleUrls: ['./place-ingredient-order.component.css']
})
export class PlaceIngredientOrderComponent implements OnInit {
  public ingredients : any = [];
  public searchString : string = '';
  public itemsPerPage : number = 5;
  public currentPage : number = 1;
  constructor(public placeOrderService : FoodService, public parentRouter : Router, public activatedRoute : ActivatedRoute) {
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
    this.placeOrderService.listAllFood().subscribe(successHandler, errorHandler);
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
    ingredient.count = 0;
    console.log(ingredient.count);
  }
  public deselectItem(ingredient: any){
    ingredient.selected = false;
    ingredient.count = 0;
  }
  public placeDeselectItem(ingredient:any) {
    this.ingredients[ingredient.num_of_items] = ingredient.num_of_items;
    ingredient.selected = false;
  }
  public incrementItem(ingredient: any){
    if (ingredient.count === ingredient.num_of_items){
      return;
    }
    ingredient.count++;
  }
  public placeOrderIncrement(ingredient:any){
    if (ingredient.count === ingredient.num_of_items) {
      return;
    }
    ingredient.count++;
    ingredient.num_of_items = ingredient.num_of_items + 1;
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


  public checkout(){
    let errorHandler = (err) => {
      console.error(err);
    };
    let successHandler = (success) => {
      this.parentRouter.navigateByUrl('/home-user/checkout-success').catch(err => {
        console.error(err);
      });
    };
    this.placeOrderService.checkout(this.getSelectedIngredients()).subscribe(successHandler, errorHandler);
  }

}
