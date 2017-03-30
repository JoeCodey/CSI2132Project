import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminService {
  private topThreeEndpoint : string = 'http://localhost:8080/api/admin/top-3-used';
  private mostExpensiveEndpoint : string = 'http://localhost:8080/api/admin/most-expensive-meal';
  private mostOrderedEndpoint : string = 'http://localhost:8080/api/admin/most-ordered';
  constructor(public http : Http) { }

  public listTopThreeFoods() : Observable<[any]>{
    return this.http.get(this.topThreeEndpoint).map(res => res.json()).catch(this.handleError);
  }
  public getMostExpensiveMeal() : Observable<any>{
    return this.http.get(this.mostExpensiveEndpoint).map(res => res.json()).catch(this.handleError);
  }
  public listMostOrdered(){
    return this.http.get(this.mostOrderedEndpoint).map(res => res.json()).catch(this.handleError);
  }

  public handleError(err){
    return Observable.throw(err.json().error || 'Server Error');
  }

}
