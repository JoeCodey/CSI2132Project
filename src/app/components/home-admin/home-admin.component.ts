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
    return  !this.isGetFoodReports() && !this.approveIngredientOrders() && !this.placeIngredientOrders();
  }
  public isGetFoodReports() {
    return this.parentRouter.url == '/home-admin/food-reports';
  }
  public approveIngredientOrders() {
    return this.parentRouter.url == '/home-admin/approve-ingredient-orders';
  }
  public placeIngredientOrders() {
    return this.parentRouter.url == '/home-admin/place-ingredient-orders';
  }
  logout(){
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    })
  }

}
