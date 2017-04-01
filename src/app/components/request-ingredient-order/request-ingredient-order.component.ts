import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../services/food.service";
import {IngredientOrderService} from '../../services/ingredient-order.service';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-ingredient-order',
  templateUrl: './request-ingredient-order.component.html',
  styleUrls: ['./request-ingredient-order.component.css']
})
export class RequestIngredientOrderComponent implements OnInit {

  public ingredients : any = [];
  public searchString : string = '';
  public itemsPerPage : number = 5;
  public currentPage : number = 1;
  public orderSuccess : boolean = false;
  constructor(public foodService : FoodService, public ingredientOrderService: IngredientOrderService, public authService: AuthService, public parentRouter : Router, public activatedRoute : ActivatedRoute) {
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

  public deselectAllItems(){
    for(let item of this.getSelectedIngredients()){
      item.selected = false;
    }
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


  public placeOrder(){
    let errorHandler = (err) => {
      console.error(err);
    };
    let successHandler = () => {
      this.deselectAllItems();
      this.orderSuccess = true;
      setTimeout(()=>this.orderSuccess=false, 3000);
    };
    this.authService.currentUser().subscribe(
      (data1) => {
        let body = {
          requester_id: data1.id,
          ingredients: this.getSelectedIngredients()
        };
        this.ingredientOrderService.createIngredientOrder(body).subscribe(
          successHandler,
          errorHandler
        );
      },
      errorHandler
    )
  }

}
