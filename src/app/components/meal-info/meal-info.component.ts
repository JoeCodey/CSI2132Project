import { Component, OnInit } from '@angular/core';
import {MealsService} from '../../services/meals.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-meal-info',
  templateUrl: './meal-info.component.html',
  styleUrls: ['./meal-info.component.css']
})
export class MealInfoComponent implements OnInit {
  public meal: any = {};
  constructor(private mealsService: MealsService,  private activatedRoute: ActivatedRoute) {
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

}
