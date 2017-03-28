import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MealsService {
  mealsEndpoint : string = 'http://localhost:8080/api/meals';
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
}
