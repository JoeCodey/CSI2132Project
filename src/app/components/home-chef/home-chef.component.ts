import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-home-chef',
  templateUrl: './home-chef.component.html',
  styleUrls: ['./home-chef.component.css']
})
export class HomeChefComponent implements OnInit {

  constructor(public parentRouter : Router, public authService : AuthService) { }

  ngOnInit() {
  }
  public isOther(){
    return  !this.isInventory() && !this.isMealRequests();
  }
  public isInventory(){
    return this.parentRouter.url === '/home-chef/inventory';
  }
  public isMealRequests(){
    return this.parentRouter.url === '/home-chef/meal-requests';
  }
  logout(){
    this.authService.logout();
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    });
  }

}
