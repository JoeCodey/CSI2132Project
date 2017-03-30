import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(public parentRouter : Router, public authService : AuthService) {
    let observable = this.authService.currentUser();
    if (!observable){
      this.parentRouter.navigateByUrl('/login').catch(err => console.error(err));
    }
    else if (observable){
      observable.subscribe(data => {
        console.log(data.role);
        if (data.role == 'user'){
          this.parentRouter.navigateByUrl('/home-user').catch(err => console.error(err));
        }
        else if (data.role == 'chef'){
          this.parentRouter.navigateByUrl('/home-chef').catch(err => console.error(err));
        }
      }, err => {
        this.parentRouter.navigateByUrl('/login').catch(err => console.error(err));
      });
    }
  }
  public isReports(){
    return this.parentRouter.url === '/home-admin/food-reports';
  }
  public isApproveIngredientOrders(){
    return this.parentRouter.url === '/home-admin/approve-ingredient-order';
  }
  public isPlaceIngredientOrders(){
    return this.parentRouter.url === '/home-admin/place-ingredient-order';
  }
  public isOther(){
    return !this.isReports() && !this.isApproveIngredientOrders() && !this.isPlaceIngredientOrders();
  }
  ngOnInit() {

  }
  public logout(){
    this.authService.logout();
    this.parentRouter.navigateByUrl('/login').catch(err => {console.error(err)});
  }

}
