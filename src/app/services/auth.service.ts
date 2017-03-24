import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  private loginEndpoint : string = 'http://localhost:8080/api/login';
  private signupEndpoint : string = 'http://localhost:8080/api/signup';
  constructor(private http : Http) { }

  public login(email: string, password: string) : Observable<any>{
    let data = {
      email: email,
      password: password
    };
    return this.http.post(this.loginEndpoint, data).map(res => res.json()).catch(this.handleError);
  }
  public signup(name: string, email: string, password: string){
    let data = {
      email: email,
      password: password,
      name: name
    };
    return this.http.post(this.signupEndpoint, data).map(res => res.json()).catch(this.handleError);
  }

  private handleError(err) : Observable<any>{
    return Observable.throw(err.json().error || 'Server Error');
  }
}
