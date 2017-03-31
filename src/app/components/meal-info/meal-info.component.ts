import { Component, OnInit } from '@angular/core';
import {MealsService} from '../../services/meals.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-meal-info',
  templateUrl: './meal-info.component.html',
  styleUrls: ['./meal-info.component.css']
})
export class MealInfoComponent implements OnInit {
  public meal: any = {};
  public deletionError : boolean = false;
  constructor(private mealsService: MealsService,  private activatedRoute: ActivatedRoute, public parentRouter : Router) {
    let that = this;
    let errorHandler = (err) => { console.error(err); };
    activatedRoute.params.subscribe(
      function(params){
        mealsService.getMeal(params['id']).subscribe(
          (data) => {that.meal = data;},
          errorHandler
        );
      },
      errorHandler
    );
  }

  ngOnInit() {
  }
  public deleteMeal(){
    if (this.meal.id){
      this.mealsService.deleteMeal(this.meal.id).subscribe(data => {
        this.parentRouter.navigateByUrl('/home-chef').catch(err => {console.error(err)});
      }, err => {
        this.deletionError = true;
        console.error(err)
      });
    }
  }
}
