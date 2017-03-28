import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCreds : any = {
    email: '',
    password: ''
  };
  signupCreds : any = {
    name: '',
    password: '',
    email: ''
  };
  hero : any = {
    name: ''
  };
  public emailRegex : string = '[A-Za-z0-9\-_]+@[A-Za-z0-9\_-]+\.[A-Za-z0-9\-_]+';
  constructor(private authService : AuthService, private parentRouter : Router) { }

  ngOnInit() {
  }

  public submitLogin(){
    let successHandler = (data) => {
      this.parentRouter.navigateByUrl('/home-user').catch(err => {
        console.error(err);
      });
    };
    let errorHandler = (err) => {
      console.log('error');
    };
    this.authService.login(this.loginCreds.email, this.loginCreds.password).subscribe(successHandler, errorHandler);
  }
  public submitSignup(){
    let successHandler = (data) => {
      this.parentRouter.navigateByUrl('/home-user').catch(err => {
        console.error(err);
      });
    };
    let errorHandler = (err) => {
      console.log('error');
    };
    this.authService.signup(this.signupCreds.name, this.signupCreds.email, this.signupCreds.password).subscribe(successHandler, errorHandler);
  }

}
