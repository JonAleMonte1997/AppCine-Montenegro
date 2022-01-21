import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductsComponent } from './components/cart-products/cart-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';



@NgModule({
  declarations: [
    CartProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartRoutingModule,
    MaterialModule,
    StoreModule.forFeature('cart', cartReducer)
  ]
})
export class CartModule { }
