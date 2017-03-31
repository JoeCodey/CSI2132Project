/**
 * Created by ericdufresne on 2017-03-27.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import {HomeUserComponent} from './components/home-user/home-user.component';
import {OrderMealComponent} from './components/order-meal/order-meal.component';
import {GetIngredientsComponent} from './components/get-ingredients/get-ingredients.component';
import {CheckoutSuccessComponent} from './components/checkout-success/checkout-success.component';
import {HomeChefComponent} from './components/home-chef/home-chef.component';
import {BrowseMealsComponent} from './components/browse-meals/browse-meals.component';
import {MealInfoComponent} from './components/meal-info/meal-info.component';
import {MealRequestsComponent} from './components/meal-requests/meal-requests.component'
import {HomeAdminComponent} from './components/home-admin/home-admin.component';
import {FoodReportComponent} from './components/food-report/food-report.component';
import {ApproveIngredientOrderComponent} from './components/approve-ingredient-order/approve-ingredient-order.component';
import {PlaceIngredientOrderComponent} from './components/place-ingredient-order/place-ingredient-order.component';

import {ChangeRoleAdminComponent} from './components/change-role-admin/change-role-admin.component';

import {NewMealComponent} from './components/new-meal/new-meal.component';
import {NewIngredientComponent} from './components/new-ingredient/new-ingredient.component';
import {IngredientInfoComponent} from './components/ingredient-info/ingredient-info.component';


export const router: Routes = [
  {
    path: '', redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home-user',
    component: HomeUserComponent,
    children: [
      {
        path: 'order-meal',
        component: OrderMealComponent
      },
      {
        path: 'get-ingredients',
        component: GetIngredientsComponent,
      },
      {
        path: '',
        redirectTo: 'get-ingredients',
        pathMatch: 'full'
      },
      {
        path: 'checkout-success',
        component: CheckoutSuccessComponent
      }
    ]
  },
  {
    path: 'home-chef',
    component: HomeChefComponent,
    children: [
      {
        path: '',
        redirectTo: 'inventory',
        pathMatch: 'full'
      },
      {
        path: 'inventory',
        component: BrowseMealsComponent
      },
      {
        path: 'meal-requests',
        component: MealRequestsComponent
      },
      {
        path: 'meal-info/:id',
        component: MealInfoComponent
      },
      {
        path: 'new-meal',
        component: NewMealComponent
      },
      {
        path: 'new-ingredient',
        component: NewIngredientComponent
      },
      {
        path: 'ingredient-info/:id',
        component: IngredientInfoComponent
      }
    ]
  },
  {
    path: 'home-admin',
    component: HomeAdminComponent,
    children: [
      {
        path: 'food-reports',
        component: FoodReportComponent
      },
      {
        path: 'meal-info/:id',
        component: MealInfoComponent
      },
      {
        path: '',
        redirectTo: 'food-reports',
        pathMatch: 'full'
      },
      {
        path: 'approve-ingredient-order',
        component: ApproveIngredientOrderComponent
      },
      {
        path: 'place-ingredient-order',
        component: PlaceIngredientOrderComponent
      },
      {
        path: 'change-role',
        component: ChangeRoleAdminComponent
      }
    ]
  },

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
