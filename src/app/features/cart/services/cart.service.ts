import { Observable, Subject } from 'rxjs';
import { MovieProduct } from '../../../models/cart.model';
import { Movie } from '../../../models/movie.model';

export class CartService {

  constructor() { }

  private amountSubject: Subject<number> = new Subject<number>();

  amountObservable: Observable<number> = this.amountSubject.asObservable();

  cart: MovieProduct[] = [];

  setCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCart(): void {
    let cartString: string | null = localStorage.getItem('cart');

    if (cartString)
      this.cart = JSON.parse(cartString);
    else
      this.cart = [];
  }

  sendAmount(): void {
    this.amountSubject.next(this.getProductsAmount());
  }

  add(movie: Movie): void {

    //Verifico si la pelicula existe y aumento su cantidad, sino la agrego
    this.getCart();

    for (let product of this.cart) {
      if (product.movie.id === movie.id) {
        product.amount++;
        this.setCart();
        this.sendAmount();
        return;
      }
    }

    let movieProduct: MovieProduct = {
      movie: movie,
      amount: 1,
    }

    this.cart.push(movieProduct);
    this.setCart();
    this.sendAmount();
  }

  remove(movie: Movie): void {

    let movieProductIndex: number = this.cart.findIndex(product => product.movie === movie);

    if (movieProductIndex >= 0) {
      this.cart.splice(movieProductIndex, 1);
      this.setCart();
      this.sendAmount();
    }
  }

  clear(): void {
    this.cart = [];
    localStorage.removeItem('cart');
    this.sendAmount();
  }

  getMoviesProduct(): MovieProduct[] {
    this.getCart();
    return this.cart;
  }

  getProductsAmount(): number {

    let amount: number = 0;

    this.getCart();

    if (this.cart.length > 0) {
      amount = this.cart.map(product => product.amount).reduce((amountPrev, amountNext) => amountPrev + amountNext);
    }

    return amount;
  }

  addAmount(indexMovie: number): void{

    this.getCart();

    this.cart[indexMovie].amount++;

    this.setCart();
    this.sendAmount();
  }

  removeAmount(indexMovie: number): void{

    let amount;

    this.getCart();

    amount = --this.cart[indexMovie].amount;

    if (amount == 0) {
      this.remove(this.cart[indexMovie].movie);
      return;
    }
    this.setCart();
    this.sendAmount();
  }
}
