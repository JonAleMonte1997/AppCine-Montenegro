import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartProductsComponent } from './components/cart-products/cart-products.component';

const routes: Routes = [
  {
    path: '',
    component: CartProductsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CartRoutingModule { }
