import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-approve-ingredient-order',
  templateUrl: './approve-ingredient-order.component.html',
  styleUrls: ['./approve-ingredient-order.component.css']
})
export class ApproveIngredientOrderComponent implements OnInit {

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
