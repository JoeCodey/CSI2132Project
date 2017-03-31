import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../services/food.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-ingredient-info',
  templateUrl: './ingredient-info.component.html',
  styleUrls: ['./ingredient-info.component.css']
})
export class IngredientInfoComponent implements OnInit {

  public ingredient : any = {};
  constructor(private foodService : FoodService, private activatedRoute : ActivatedRoute  ) {
    this.activatedRoute.params.subscribe((params : Params) => {
      let id = params['id'];
      this.foodService.getFood(id).subscribe(data => {
        this.ingredient = data;
      }, err => {
        console.error(err);
      });
    });
  }

  ngOnInit() {
  }


}
