import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MealsService {
  mealsEndpoint : string = 'http://localhost:8080/api/meals';
  mealRequestEndpoint: string = 'http://localhost:8080/api/meal-requests';
  constructor(private http : Http) { }

  public listAllMeals() : Observable<any> {
    let params : URLSearchParams = new URLSearchParams();
    params.set('ignoreNone', 'true');
    let requestOptions = new RequestOptions();
    requestOptions.params = params;
    return this.http.get(this.mealsEndpoint, requestOptions).map(res => res.json()).catch(this.handleError);
  }

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
    return this.http.delete(this.mealsEndpoint + '/' + id).map(res => res.json()).catch(this.handleError);
  }
  public checkout(items : [any], userId : any) : Observable<any>{
    let data = {
      userId: userId,
      items: items
    };
    return this.http.post(this.mealRequestEndpoint, data).map(res => res.json()).catch(this.handleError);
  }

  public listAllMealRequests(): Observable<any> {
    return this.http.get(this.mealRequestEndpoint).map(res => res.json()).catch(this.handleError);
  }

  public getMealRequestIngredients(id: number){
    return this.http.get(this.mealRequestEndpoint+'/'+id).map(res => res.json()).catch(this.handleError);
  }
}
