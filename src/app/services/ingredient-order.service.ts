import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IngredientOrderService {
  ingredientOrderEndpoint : string = 'http://localhost:8080/api/ingredient-orders';
  constructor(private http: Http) { }

  public listIngredientOrders() : Observable<any>{
    return this.http.get(this.ingredientOrderEndpoint).map(res => res.json()).catch(this.handleError);
  }
  public getIngredientOrder(id : string) : Observable<any>{
    return this.http.get(this.ingredientOrderEndpoint+'/'+id).map(res => res.json()).catch(this.handleError);
  }

  public deleteIngredientOrder(id : string): Observable<any>{
    return this.http.delete(this.ingredientOrderEndpoint+'/'+id).map(res => res.json()).catch(this.handleError);
  }

  public approveIngredientOrder(id: string, approver_id : string): Observable<any>{
    return this.http.put(this.ingredientOrderEndpoint+'/'+id, {order_id: id, approved_by_id: approver_id}).map(res => res.json()).catch(this.handleError);
  }

  public createIngredientOrder(data: any): Observable<any>{
    return this.http.post(this.ingredientOrderEndpoint, data).map(res => res.json()).catch(this.handleError);
  }

  public checkout(items: [any]): Observable<any>{
    let data = {
      items: items
    };
    return this.http.put(this.ingredientOrderEndpoint+'/checkout', data).map(res => res.json()).catch(this.handleError);
  }
  public handleError(err) : Observable<any>{
    return Observable.throw(err.json().error || 'Server Error');
  }
}
