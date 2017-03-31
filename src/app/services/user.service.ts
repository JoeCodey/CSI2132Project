import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  private userEndpoint : string = 'http://localhost:8080/api/users';

  constructor(private http: Http) {

  }

  public listUser() : Observable<any>{
    return this.http.get(this.userEndpoint).map(res => res.json()).catch(this.handleError);
  }
  public changeUser(role : string, id: string){
    let data = {role: role};
    return this.http.put(this.userEndpoint+'/'+id, data ).map(res => res.json()).catch(this.handleError);
  }
  public handleError(err) : Observable<any>{
    return Observable.throw(err.json().error || 'Server Error');
  }


}
