import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-place-ingredient-order',
  templateUrl: './place-ingredient-order.component.html',
  styleUrls: ['./place-ingredient-order.component.css']
})
export class PlaceIngredientOrderComponent implements OnInit {

  constructor(public parentRouter : Router) {
  }

  ngOnInit() {
  }
  logout(){
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    })
  }
}
