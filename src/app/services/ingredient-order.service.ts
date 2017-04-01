import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IngredientOrderService {
  ingredientEndpoint : string = 'http://localhost:8080/api/ingredient-orders';
  constructor(private http: Http) { }

  public listIngredientOrders() : Observable<any>{
    return this.http.get(this.ingredientEndpoint).map(res => res.json()).catch(this.handleError);
  }
  public getIngredientOrder(id : string) : Observable<any>{
    return this.http.get(this.ingredientEndpoint+'/'+id).map(res => res.json()).catch(this.handleError);
  }

  public deleteIngredientOrder(id : string): Observable<any>{
    return this.http.delete(this.ingredientEndpoint+'/'+id).map(res => res.json()).catch(this.handleError);
  }

  public approveIngredientOrder(id: string, approver_id : string): Observable<any>{
    return this.http.put(this.ingredientEndpoint+'/'+id, {order_id: id, approved_by_id: approver_id}).map(res => res.json()).catch(this.handleError);
  }

  public checkout(items: [any]): Observable<any>{
    let data = {
      items: items
    };
    return this.http.put(this.ingredientEndpoint+'/checkout', data).map(res => res.json()).catch(this.handleError);
  }
  public handleError(err) : Observable<any>{
    return Observable.throw(err.json().error || 'Server Error');
  }
}
