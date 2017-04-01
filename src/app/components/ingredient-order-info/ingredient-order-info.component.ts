import { Component, OnInit } from '@angular/core';
import {IngredientOrderService} from '../../services/ingredient-order.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ingredient-order-info',
  templateUrl: './ingredient-order-info.component.html',
  styleUrls: ['./ingredient-order-info.component.css']
})
export class IngredientOrderInfoComponent implements OnInit {
  public order: any = {};
  constructor(private ingredientOrderService: IngredientOrderService, private authService: AuthService, private activatedRoute: ActivatedRoute, private parentRouter : Router) {
    let that = this;
    activatedRoute.params.subscribe(
      function(params){
        that.ingredientOrderService.getIngredientOrder(params['id']).subscribe(
          (data) => {that.order = data;},
          (err) => {console.error(err);}
        );
      },
      (err) => {console.error(err);}
    );

  }

  public getTotalCost() : number{ //IT IS USED
    if(!this.order.ingredients){return 0;}
    let total = 0;
    for(let ingr of this.order.ingredients){
      total += ingr.price_per_item*ingr.count_required;
    }
    return total;
  }

  public deleteIngredientOrder(){
    if(this.order.id) {
      this.ingredientOrderService.deleteIngredientOrder(this.order.id).subscribe(
        (data) => {
          this.parentRouter.navigateByUrl('/home-admin/approve-ingredient-order').catch(err => {console.error(err)});
        },
        (err) => {console.error(err);}
      );
    }
  }

  public approveIngredientOrder(){
    let that = this;
    let errorHandler = (err) => {console.error(err);};
    if(this.order.id){
      that.authService.currentUser().subscribe(
        (data1) => {
          that.ingredientOrderService.approveIngredientOrder(that.order.id, data1.id).subscribe(
            (data2) => {
              console.log(data2['Message']);
              that.parentRouter.navigateByUrl('/home-admin/approve-ingredient-order').catch(errorHandler);
            },
            errorHandler
          );
        },
        errorHandler
      );

    }
  }

  ngOnInit() {
  }

}
