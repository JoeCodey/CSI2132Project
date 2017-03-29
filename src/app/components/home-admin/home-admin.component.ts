import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(public parentRouter : Router) {
  }

  ngOnInit() {
  }
  public isOther(){
    return  !this.isOrderMeal() && !this.isGetIngredients();
  }
  public isOrderMeal(){
    return this.parentRouter.url == '/home-admin/order-meal';
  }
  public isGetIngredients(){
    return this.parentRouter.url == '/home-admin/get-ingredients';
  }
  logout(){
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    })
  }

}
