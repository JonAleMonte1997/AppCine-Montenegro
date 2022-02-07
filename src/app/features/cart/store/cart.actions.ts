import { createAction, props } from "@ngrx/store";
import { Movie } from "src/app/models/movie.model";

export const cartAddMovie = createAction(
  'Cart - Add movie',
  props<{movie: Movie}>()
)

export const cartIncreaseMovieAmount = createAction(
  'Cart - Increase movie amount',
  props<{movieIndex: number}>()
)

export const cartRemoveMovie = createAction(
  'Cart - Remove movie',
  props<{movieIndex: number}>()
)

export const cartDecreaseAmount = createAction(
  'Cart - Decrease amount',
  props<{movieIndex: number}>()
)

export const cartClear = createAction(
  'Cart - Clear'
)
