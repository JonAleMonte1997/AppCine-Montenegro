import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieProduct } from 'src/app/models/cart.model';
import { Movie } from 'src/app/models/movie.model';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartState } from '../../store/cart-store.model';
import { select, Store } from '@ngrx/store';
import { cartAddMovie, cartClear, cartDecreaseAmount, cartRemoveMovie } from '../../store/cart.actions';
import { Observable, Subscription } from 'rxjs';
import { cartSelector } from '../../store/cart.selectors';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit, OnDestroy {

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private store: Store<CartState>
  ) { }

  subscriptions: Subscription[] = [];

  cart$!: Observable<MovieProduct[]>;

  logged: boolean = false;

  hasProducts: boolean = false;

  ngOnInit(): void {

    let subscription;

    this.cart$ = this.store.pipe(
      select(cartSelector)
    )

    subscription = this.cart$.subscribe(
      cart => {
        this.hasProducts = (cart.length > 0);
      }
    );

    this.subscriptions.push(subscription);

    this.logged = this.loginService.isLogin();
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s.unsubscribe());
  }

  purchase(): void {
    this.snackBar.open('Compra exitosa, redirigiendo a MercadoPago...', undefined, {
      horizontalPosition: 'end',
      duration: 5000
    });

    this.store.dispatch(cartClear());

    setTimeout(() =>{
      window.location.href = "https://www.mercadopago.com.ar";
    }, 5000)
  }

  calculateTotal(): number {

    let total: number = 0;

    let subscription;

    subscription = this.cart$.subscribe(cart => {
      cart.forEach(product => {
        total += product.movie.price * product.amount;
      });
    })

    this.subscriptions.push(subscription);

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
