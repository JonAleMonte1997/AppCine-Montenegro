import { Component, OnInit } from '@angular/core';
import { MovieProduct } from 'src/app/models/cart.model';
import { Movie } from 'src/app/models/movie.model';
import { CartService } from 'src/app/features/cart/services/cart.service';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) { }

  cart: MovieProduct[] = [];

  logged: boolean = false;

  ngOnInit(): void {
    this.getProducts();

    this.logged = this.loginService.isLogin();
  }

  getProducts(): void {
    this.cart = this.cartService.getMoviesProduct();
  }

  removeMovieInCart(movie: Movie): void {

    this.cartService.remove(movie);

    this.getProducts();
  }

  purchase(): void {
    this.snackBar.open('Compra exitosa, redirigiendo a MercadoPago...', undefined, {
      horizontalPosition: 'end',
      duration: 5000
    });
  }

  calculateTotal(): number {

    let total: number = 0;

    this.cart.forEach(product => {
      total += product.movie.price * product.amount;
    });

    return total;
  }
}
