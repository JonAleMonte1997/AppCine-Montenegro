import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {

  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      movies => this.movies = movies
    );
  }

  movieDetails(movie: Movie) {
    this.router.navigate([`movies/info/${movie.id}`]);
  }
}
