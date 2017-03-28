import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  constructor(public parentRouter : Router) {
  }

  ngOnInit() {
  }
  public isOther(){
    return  !this.isOrderMeal() && !this.isGetIngredients();
  }
  public isOrderMeal(){
    return this.parentRouter.url == '/home-user/order-meal';
  }
  public isGetIngredients(){
    return this.parentRouter.url == '/home-user/get-ingredients';
  }
  logout(){
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    })
  }

}
