import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../services/food.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-ingredient-info',
  templateUrl: './ingredient-info.component.html',
  styleUrls: ['./ingredient-info.component.css']
})
export class IngredientInfoComponent implements OnInit {

  public ingredient : any = {};
  public deletionError : boolean = false;
  constructor(private foodService : FoodService, private activatedRoute : ActivatedRoute, private parentRouter : Router) {
    this.activatedRoute.params.subscribe((params : Params) => {
      let id = params['id'];
      this.foodService.getFood(id).subscribe(data => {
        this.ingredient = data;
      }, err => {
        console.error(err);
      });
    });
  }
  public deleteIngredient(){
    if (this.ingredient.id){
      this.foodService.deleteFood(this.ingredient.id).subscribe(data => {
        this.parentRouter.navigateByUrl('/home-chef').catch(err => {
          console.error(err);
        })
      }, err => {
        this.deletionError = true;
        console.error(err);
      })
    }
  }

  ngOnInit() {
  }


}
