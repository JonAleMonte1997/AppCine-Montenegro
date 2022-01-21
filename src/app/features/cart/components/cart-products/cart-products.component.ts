import { Component, OnInit } from '@angular/core';
import { MovieProduct } from 'src/app/models/cart.model';
import { Movie } from 'src/app/models/movie.model';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartState } from '../../store/cart-store.model';
import { select, Store } from '@ngrx/store';
import { cartAddMovie, cartClear, cartDecreaseAmount, cartRemoveMovie } from '../../store/cart.actions';
import { Observable } from 'rxjs';
import { cartSelector } from '../../store/cart.selectors';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private store: Store<CartState>
  ) { }

  cart$!: Observable<MovieProduct[]>;

  logged: boolean = false;

  ngOnInit(): void {
    this.cart$ = this.store.pipe(
      select(cartSelector)
    )

    this.logged = this.loginService.isLogin();
  }

  purchase(): void {
    this.snackBar.open('Compra exitosa, redirigiendo a MercadoPago...', undefined, {
      horizontalPosition: 'end',
      duration: 5000
    });

    this.store.dispatch(cartClear());
  }

  calculateTotal(): number {

    let total: number = 0;

    this.cart$.subscribe(cart => {
      cart.forEach(product => {
        total += product.movie.price * product.amount;
      });
    })

    return total;
  }

  addAmount(movie: Movie): void {
    this.store.dispatch(cartAddMovie({movie}));
  }

  decreaseAmount(movieIndex: number): void {
    this.store.dispatch(cartDecreaseAmount({movieIndex}));
  }

  removeMovie(movieIndex: number): void {
    this.store.dispatch(cartRemoveMovie({movieIndex}));
  }
}
