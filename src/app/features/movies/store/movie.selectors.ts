import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieState } from "./movie-store.model";

export const moviesStateSelector = createFeatureSelector<MovieState>('movieState');

export const getMoviesSelector = createSelector(
  moviesStateSelector,
  (state: MovieState) => state.movies
)
