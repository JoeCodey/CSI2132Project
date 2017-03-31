import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../services/food.service";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css']
})
export class NewIngredientComponent implements OnInit {
  newIngredient : any = {
    threshold: 0,
    price_per_item: 0.01
  };
  categories : any = [];
  integerError : boolean = false;
  nameError : boolean = false;
  constructor(private foodService : FoodService, private categoryService : CategoryService, private parentRouter : Router) {
    this.categoryService.listCategories().subscribe(data => {
      this.categories = data;
      if (this.categories.length > 0){
        this.newIngredient.category_name = this.categories[0].category_name;
      }
    }, err => {
      console.error(err);
    });
  }
  public changeThreshold(){
    this.integerError = !Number.isInteger(this.newIngredient.threshold);
  }

  ngOnInit() {
  }

  public createIngredient(){
    this.newIngredient.price_per_item = Math.round(this.newIngredient.price_per_item * 100) / 100;
    this.foodService.createFood(this.newIngredient).subscribe(data => {
      this.parentRouter.navigateByUrl('/home-chef/ingredient-info/'+data.id);
    }, err => {
      console.error(err);
      this.nameError = true;
    });
  }
  public resetNameError(){
    this.nameError = false;
  }

}
