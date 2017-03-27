import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginEmail : string = '';
  loginPassword : string = '';

  signupEmail : string = '';
  signupPassword: string = '';
  signupName : string = '';
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  public submitLogin(){
    let successHandler = (data) => {
      console.log('success');
    };
    let errorHandler = (err) => {
      console.log('error');
    };
    this.authService.login(this.loginEmail, this.loginPassword).subscribe(successHandler, errorHandler);
  }
  public submitSignup(){
    let successHandler = (data) => {
      console.log('success');
    };
    let errorHandler = (err) => {
      console.log('error');
    };
    this.authService.signup(this.signupName, this.signupEmail, this.signupPassword).subscribe(successHandler, errorHandler);
  }

}
