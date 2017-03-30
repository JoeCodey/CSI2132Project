import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private loginEndpoint : string = 'http://localhost:8080/api/login';
  private signupEndpoint : string ='http://localhost:8080/api/signup';
  private authEndpoint : string = 'http://localhost:8080/api/auth/';
  private currentUserKey = 'current-user-key';
  constructor(private http : Http) {

  }
  public currentUser() : Observable<any>{
    let token = localStorage.getItem(this.currentUserKey);
    return this.http.get(this.authEndpoint+token).map(res => res.json()).catch(this.handleError);
  }
  public login(email : string, password : string) : Observable<any>{
    let data = {
      email: email,
      password: password
    };
    let observable = this.http.post(this.loginEndpoint, data).map(res => res.json()).catch(this.handleError).share();
    observable.subscribe(data => {
      localStorage.setItem(this.currentUserKey, data.session_token);
    }, err => {console.error(err)});
    return observable;
  }
  public signup(name : string, email : string, password : string) : Observable<any>{
    let data = {
      email: email,
      password: password,
      name: name
    };
    let observable = this.http.post(this.signupEndpoint, data).map(res => res.json()).catch(this.handleError).share();
    observable.subscribe(data => {
      localStorage.setItem(this.currentUserKey, data.session_token);
    }, err => {console.error(err)});
    return observable;
  }
  public logout(){
    localStorage.removeItem(this.currentUserKey);
  }

  public handleError(err) : Observable<any>{
    return Observable.throw(err.json().error || 'Server Error');
  }

}
