import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductsComponent } from './components/cart-products/cart-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { CartService } from './services/cart.service';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    CartProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartRoutingModule,
    MaterialModule
  ]
})
export class CartModule { }
