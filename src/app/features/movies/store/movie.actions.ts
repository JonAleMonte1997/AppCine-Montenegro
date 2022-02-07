import { createAction, props } from "@ngrx/store";
import { Movie } from "src/app/models/movie.model";

export const loadMovies = createAction(
  'Movie - Load movies from API'
)

export const loadMoviesSuccess = createAction(
  'Movie - Loading success',
  props<{movies: Movie[]}>()
)
