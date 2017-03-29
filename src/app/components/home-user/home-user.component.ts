import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  constructor(public parentRouter : Router, public authService : AuthService) {
    let observable = this.authService.currentUser();
    if (!observable){
      this.parentRouter.navigateByUrl('/login').catch(err => {console.error(err)});
    }
    else{
      observable.subscribe(data => {
        //Redirect to admin or something if chef or admin
      }, err => {
        this.parentRouter.navigateByUrl('/login').catch(err => {console.error(err)});
      })
    }
  }

  ngOnInit() {
  }
  public isOther(){
    return  !this.isOrderMeal() && !this.isGetIngredients();
  }
  public isOrderMeal(){
    return this.parentRouter.url === '/home-user/order-meal';
  }
  public isGetIngredients(){
    return this.parentRouter.url === '/home-user/get-ingredients';
  }
  logout(){
    this.authService.logout();
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    });
  }

}
