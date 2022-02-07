import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from '../../services/movie.service';
import { loadMovies } from '../../store/movie.actions';
import { getMoviesSelector } from '../../store/movie.selectors';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {

  movies: Observable<Movie[]> = new Observable<Movie[]>();

  constructor(
    private router:Router,
    private store:Store
  ) { }

  ngOnInit(): void {
    this.movies = this.store.select(getMoviesSelector);
    this.store.dispatch(loadMovies());
  }

  movieDetails(movie: Movie) {
    this.router.navigate([`movies/info/${movie.id}`]);
  }
}
