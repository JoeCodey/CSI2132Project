import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../../services/user.service";
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}

@Component({
  selector: 'app-change-role-admin',
  templateUrl: './change-role-admin.component.html',
  styleUrls: ['./change-role-admin.component.css']
})

export class ChangeRoleAdminComponent implements OnInit {
  public users : any = [];
  public searchString : string = '';
  public itemsPerPage : number = 5;
  public currentPage : number = 1;

  constructor(public userService : UserService, public parentRouter: Router, public activatedRoute : ActivatedRoute) {
    this.userService.listUser().subscribe(data => {
      this.users = data;
    }, err => console.error(err));
  }
  public totalPageCount() {
    let val = Math.ceil(this.spliceUsers().length / this.itemsPerPage);
    let arr = [];
    for (let i = 1; i <= val; i++) {
      arr.push(i);
    }
    return arr;
  }
  public spliceUsers(){
    let modifedSeachString = this.searchString.trim().toLocaleLowerCase();
    console.log(modifedSeachString);
    return this.users.filter((user) => {
        return user.name.trim().toLocaleLowerCase().includes(modifedSeachString) ||
            user.email.trim().toLowerCase().includes(modifedSeachString);
    });
  }
  public getPaginatedResults(){
    let users = this.spliceUsers()
    let first = (this.currentPage-1) * this.itemsPerPage;
    let last = (this.currentPage * this.itemsPerPage);

    return users.slice(first, last);
  }

  public makeChef(user : any) {  //need to know which users are checked
    this.userService.changeUser('chef', user.id).subscribe(data => {
      user.role = 'chef';
    }, err => {
      console.error(err);
    });
  }
  public makeUser(user : any) {  //need to know which users are checked
    this.userService.changeUser('chef', user.id).subscribe(data => {
      user.role = 'user';
    }, err => {
      console.error(err);
    });
  }
  public makeAdmin(user : any) {  //need to know which users are checked
    this.userService.changeUser('chef', user.id).subscribe(data => {
      user.role = 'admin';
    }, err => {
      console.error(err);
    });
  }
  public checkbox(user) {
    user.selected = (user.selected) ? false : true ;
  }









  ngOnInit() {
  }

}
