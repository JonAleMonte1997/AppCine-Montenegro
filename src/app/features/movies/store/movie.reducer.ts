import { createReducer, on } from "@ngrx/store";
import { Movie } from "src/app/models/movie.model";
import { loadMoviesSuccess } from "./movie.actions";

const moviesInitialState: Movie[] = [];

const _moviesReducer = createReducer(
  moviesInitialState,
  on(loadMoviesSuccess, (state, {movies}) => {
    return {
      ...state,
      movies
    }
  })
)

export function moviesReducer(state: any, action: any) {
  return _moviesReducer(state, action);
}
