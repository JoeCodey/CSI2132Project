import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IngredientOrderService} from '../../services/ingredient-order.service';

@Component({
  selector: 'app-approve-ingredient-order',
  templateUrl: './approve-ingredient-order.component.html',
  styleUrls: ['./approve-ingredient-order.component.css']
})
export class ApproveIngredientOrderComponent implements OnInit {
  public approvedOrders: any = [];
  public unapprovedOrders: any = [];
  public searchStringApproved : string = '';
  public searchStringUnapproved : string = '';
  public itemsPerPage : number = 5;
  public currentPageApproved : number = 1;
  public currentPageUnapproved : number = 1;

  constructor(private ingredientOrderService: IngredientOrderService, private parentRouter : Router) {
    let successHandler = (data) => {
      for(let order of data){
        order.selected = false;
        order.count = 0;
        if(order.approved){
          this.approvedOrders.push(order);
        }
        else{
          this.unapprovedOrders.push(order);
        }
      }
    };
    let errorHandler = (err) =>{
      console.error(err);
    };

    this.ingredientOrderService.listIngredientOrders().subscribe(successHandler, errorHandler);
  }

  ngOnInit() {
  }

  public getApprovedOrders(){
    let modifiedSearchString = this.searchStringApproved.trim().toLowerCase();
    return this.approvedOrders.filter((item) => {
      if (modifiedSearchString.length == 0){
        return true;
      }
      else{
        return item.name.trim().toLowerCase().includes(modifiedSearchString);
      }
    });
  }

  public getUnapprovedOrders(){
    let modifiedSearchString = this.searchStringUnapproved.trim().toLowerCase();
    return this.unapprovedOrders.filter((item) => {
      if (modifiedSearchString.length == 0){
        return true;
      }
      else{
        return item.name.trim().toLowerCase().includes(modifiedSearchString);
      }
    });
  }

  public totalPageCount(isApproved: boolean){
    let val = 0;
    if(isApproved){
      val = Math.ceil(this.getApprovedOrders().length/this.itemsPerPage);

    }
    else{
      val = Math.ceil(this.getUnapprovedOrders().length/this.itemsPerPage);
    }
    let arr = [];
    for (let i = 1;i<=val;i++){
      arr.push(i);
    }
    return arr;
  }

  public getPaginatedResults(isApproved: boolean){
    if(isApproved){
      let first = (this.currentPageApproved-1) * this.itemsPerPage;
      let last = (this.currentPageApproved * this.itemsPerPage);
      return this.getApprovedOrders().slice(first, last);
    }
    else{
      let first = (this.currentPageUnapproved-1) * this.itemsPerPage;
      let last = (this.currentPageUnapproved * this.itemsPerPage);
      return this.getUnapprovedOrders().slice(first, last);
    }
  }

  logout(){
    this.parentRouter.navigateByUrl('/login').catch(err => {
      console.error(err);
    })
  }
}
