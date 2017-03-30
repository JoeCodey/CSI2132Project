import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MealsService {
  mealsEndpoint : string = 'http://localhost:8080/api/meals';
  mealRequestEndpoint: string = 'http://localhost:8080/api/meal-requests';
  constructor(private http : Http) { }

  public listMeals() : Observable<any>{
    return this.http.get(this.mealsEndpoint).map(res => res.json()).catch(this.handleError);
  }
  public getMeal(id : string){
    return this.http.get(this.mealsEndpoint+'/'+id).map(res => res.json()).catch(this.handleError);
  }
  public handleError(err) : Observable<any>{
    return Observable.throw(err.json().error || 'Server Error');
  }
  public deleteMeal(id: string): Observable<any>{
    return this.http.delete(this.mealsEndpoint + '/' + id).catch(this.handleError);
  }
  public createMeal(meal: any, ingredients : [any]) : Observable<any>{
    let data = {
      cuisine: meal.cuisine,
      name: meal.name,
      description: meal.description,
      ingredients: ingredients
    };
    return this.http.post(this.mealsEndpoint, data).map(res => res.json()).catch(this.handleError);
  }
  public checkout(items : [any], userId : any) : Observable<any>{
    let data = {
      userId: userId,
      items: items
    };
    return this.http.post(this.mealRequestEndpoint, data).map(res => res.json()).catch(this.handleError);
  }
}
