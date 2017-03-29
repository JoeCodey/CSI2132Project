import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-chef',
  templateUrl: './home-chef.component.html',
  styleUrls: ['./home-chef.component.css']
})
export class HomeChefComponent implements OnInit {

  constructor(public parentRouter : Router) {
  }

  ngOnInit() {
  }
  public isOther(){
    return  !this.isOrderMeal() && !this.isGetIngredients();
  }
  public isOrderMeal(){
    return this.parentRouter.url == '/home-chef/order-meal';
  }
  public isGetIngredients(){
    return this.parentRouter.url == '/home-chef/get-ingredients';
  }
  logout(){
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    })
  }

}
