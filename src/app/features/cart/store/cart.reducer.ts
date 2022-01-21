import { createReducer, on } from "@ngrx/store";
import { CartState } from "./cart-store.model";
import { cartAddMovie, cartClear, cartDecreaseAmount, cartRemoveMovie } from "./cart.actions";

export const cartInitialState: CartState = {
  cart: (localStorage.getItem('cart')) ? JSON.parse(<string>localStorage.getItem('cart')) : []
}

const _cartReducer = createReducer(
  cartInitialState,

  on(cartAddMovie, (state, { movie }) => {
    const cart = [...state.cart];

    let movieIndex: number = cart.findIndex(product => product.movie.id === movie.id);

    if (movieIndex > -1) {

      let movie = {...cart[movieIndex]};

      movie.amount++;

      cart[movieIndex] = movie;

    } else {
      cart.push({movie: movie, amount: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    return {
      ...state,
      cart
    };
  }),

  on(cartDecreaseAmount, (state, {movieIndex}) => {

    const cart = [...state.cart];

    let amount = cart[movieIndex].amount - 1;

    if (amount <= 0) {
      cart.splice(movieIndex, 1);
    } else {

      let movie = {...cart[movieIndex]};

      movie.amount--;

      cart[movieIndex] = movie;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    return {
      ...state,
      cart
    };
  }),

  on(cartRemoveMovie, (state, {movieIndex}) => {

    const cart = [...state.cart];

    cart.splice(movieIndex, 1);

    localStorage.setItem('cart', JSON.stringify(cart));

    return {
      ...state,
      cart
    };
  }),

  on(cartClear, state => {

    localStorage.removeItem('cart');

    return {
      ...state,
      cart: []
    }
  })
)

export function cartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
