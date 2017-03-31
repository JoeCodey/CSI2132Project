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
    // let successHandler = (data) => {
    //   this.users = data;
    //   for(let user of this.users){
    //     user.selected = false;
    //   }
    //   console.log(JSON.stringify(this.users));
    // };
    // let errorHandler = (err) => {
    //   console.error(err);
    // };

    this.userService.listUser().subscribe(data => {
      this.users = data;
      for (let user of this.users){
        user.selected = false ;
      }
      console.log("LOOK HERE A");
      console.log(this.users);
    }, err => console.error(err));


    //this.userService.listUser().subscribe(successHandler, errorHandler);

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
        return user.name.trim().toLocaleLowerCase().includes(modifedSeachString);
    });
  }
  public getPaginatedResults(){
    let users = this.spliceUsers()
    let first = (this.currentPage-1) * this.itemsPerPage;
    let last = (this.currentPage * this.itemsPerPage);

    return users.slice(first, last);
  }

  public makeChef() {  //need to know which users are checked
    let selectedUser = this.users.filter((x) => x.selected)
    console.log(selectedUser);
    for(let user of selectedUser){
      this.userService.changeUser('chef',user.id) ;
    }
  }
  public makeUser() {  //need to know which users are checked
    let selectedUser = this.users.filter((x) => x.selected)
    console.log(selectedUser);
    for(let user of selectedUser){
      this.userService.changeUser('user',user.id) ;
    }
  }
  public makeAdmin() {  //need to know which users are checked
    let selectedUser = this.users.filter((x) => x.selected)
    console.log(selectedUser);
    for(let user of selectedUser){
      this.userService.changeUser('admin',user.id) ;
    }
  }
  public checkbox(user) {
    user.selected = (user.selected) ? false : true ;
  }









  ngOnInit() {
  }

}
