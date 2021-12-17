import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.movieService.getMovies('').subscribe(
      movies => this.movies = movies,
    );
  }

  movieDetails(movie: Movie) {
    this.router.navigate([`info/${movie.id}`]);
  }
}
