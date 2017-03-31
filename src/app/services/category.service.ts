import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService {

  public categoryEndpoint : string = 'http://localhost:8080/api/categories';
  constructor(private http : Http) { }

  public listCategories() : Observable<[any]>{
    return this.http.get(this.categoryEndpoint).map(res => res.json()).catch(this.handleError);
  }

  public handleError(err) : Observable<any>{
    return Observable.throw(err.json().error || 'Server Error');
  }
}
