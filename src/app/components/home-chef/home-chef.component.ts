import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-chef',
  templateUrl: './home-chef.component.html',
  styleUrls: ['./home-chef.component.css']
})
export class HomeChefComponent implements OnInit {

  constructor(public parentRouter : Router) { }

  ngOnInit() {
  }
  public isOther(){
    return  !this.isBrowseMeals() && !this.isMealRequests();
  }
  public isBrowseMeals(){
    return this.parentRouter.url === '/home-chef/browse-meals';
  }
  public isMealRequests(){
    return this.parentRouter.url === '/home-chef/meal-requests';
  }
  logout(){
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    });
  }

}
