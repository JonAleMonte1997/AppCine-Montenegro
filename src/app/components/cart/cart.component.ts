import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart, MovieProduct } from 'src/app/models/cart.model';
import { Movie } from 'src/app/models/movie.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  discountForm: FormGroup = new FormGroup({
    discount: new FormControl(null, [Validators.min(0), Validators.max(100)])
  })

  cart: Cart = {
    products: []
  };

  ngOnInit(): void {

    this.cart = this.cartService.getMovies();

    this.discountForm.controls['discount'].valueChanges.subscribe(
      res => {
        if (this.discountForm.valid) {
          this.cart.discount = Number(res);
        }
      }
    );
  }

  removeMovieInCart(movie: Movie): void {

    this.cartService.remove(movie);

    this.ngOnInit();
  }

  purchase(): void {
    console.log(this.cart);
  }

  validateInput(control: string): boolean {
    return (this.discountForm.controls[control].invalid && (this.discountForm.controls[control].dirty || this.discountForm.controls[control].touched))
  }

  calculateSubTotal(): number {

    let subtotal: number = 0;

    this.cart.products.forEach(product => {
      subtotal += product.movie.price * product.amount;
    });

    return subtotal;
  }

  calculateTotal(): number {

    let total: number = this.calculateSubTotal();

    if(this.cart.discount){

      total -= total*(this.cart.discount/100);
    }


    return total;
  }
}
