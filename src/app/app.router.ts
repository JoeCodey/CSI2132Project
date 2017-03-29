/**
 * Created by ericdufresne on 2017-03-27.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import {HomeUserComponent} from './components/home-user/home-user.component';
import {HomeChefComponent} from './components/home-chef/home-chef.component';
import {HomeAdminComponent} from './components/home-admin/home-admin.component';
import {OrderMealComponent} from './components/order-meal/order-meal.component';
import {GetIngredientsComponent} from './components/get-ingredients/get-ingredients.component';
import {CheckoutSuccessComponent} from './components/checkout-success/checkout-success.component';

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
        redirectTo: 'browse-meals',
        pathMatch: 'full'
      },
      {
        path: 'browse-meals',
        component: OrderMealComponent
      },
      {
        path: 'meal-requests',
        component: GetIngredientsComponent,
      },
    ]
  },

  {
    path: 'home-admin',
    component: HomeAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'food-reports',
        pathMatch: 'full'
      },
      {
        path: 'food-reports',
        component: OrderMealComponent
      },
      {
        path: 'approve-ingredient-orders',
        component: OrderMealComponent
      },
      {
        path: 'place-ingredient-orders',
        component: GetIngredientsComponent,
      },
    ]
  },

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
