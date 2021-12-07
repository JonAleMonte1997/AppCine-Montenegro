import { Injectable } from '@angular/core';
import { Cart, MovieProduct } from '../models/cart.model';
import { Movie } from '../models/movie.model';
import { moviesMock } from './mocks/movies.mock';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cart: Cart = {
    products: []
  };

  add(movie: Movie): void {

    let storeString: string | null = localStorage.getItem('cart');

    let movieInCart: boolean = false;

    //Reviso si existe un carrito en el localStorage, si es así verifico si la pelicula existe y aumento su cantidad, sino la agrego

    if (storeString) {

      this.cart = JSON.parse(storeString);


      for (let product of this.cart.products) {

        if (product.movie.id === movie.id) {
          product.amount++;

          movieInCart = true;
          break;
        }
      }

    } else {

      this.cart = {products: []};
    }

    if (!movieInCart) {

      let movieProduct: MovieProduct = {
        movie: movie,
        amount: 1,
      }

      this.cart.products.push(movieProduct);
    }


    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  remove(movie: Movie): void {

    let movieProductIndex: number = this.cart.products.findIndex(product => product.movie === movie);

    if (movieProductIndex >= 0) {
      this.cart.products.splice(movieProductIndex, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

  }

  clear(): void {

    this.cart = {products: []};
    localStorage.removeItem('cart');
  }

  getMovies(): Cart {

    let storeString: string | null = localStorage.getItem('cart');

    if (storeString) this.cart = JSON.parse(storeString);

    return this.cart;
  }
}
