import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart-store.model";

export const cartStateSelector = createFeatureSelector<CartState>('cart');

export const cartSelector = createSelector(
  cartStateSelector,
  (state: CartState) => state.cart
)

export const amountSelector = createSelector(
  cartStateSelector,
  (state: CartState) => {
    if (state.cart.length > 0) {
      let amount = state.cart.map(movieProduct => movieProduct.amount).reduce((amountPrev, amountCurrent) => amountPrev + amountCurrent);
      return amount;
    }
    return 0;
  }
)
