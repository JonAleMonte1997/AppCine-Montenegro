import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { MovieService } from "../services/movie.service";
import { loadMovies, loadMoviesSuccess } from "./movie.actions";

@Injectable()
export class MovieEffects {

  constructor(
    private actions$: Actions,
    private movieService: MovieService
  ) {}

  loadMovies$ = createEffect(() => this.actions$.pipe(
      ofType(loadMovies),
      mergeMap(() => this.movieService.getMovies()
        .pipe(
          map(movies => loadMoviesSuccess({movies})),
          catchError(() => EMPTY)
        ))
    )
  )
}
