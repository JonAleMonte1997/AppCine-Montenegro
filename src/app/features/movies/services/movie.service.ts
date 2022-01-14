import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../../../models/movie.model';

@Injectable()
export class MovieService {

  movieApi: string = `${environment.apiMovieUrl}/apiMovie/v1`;

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<Movie[]> {

    return this.httpClient.get<Movie[]>(`${this.movieApi}/movies`);
  }

  getMovie(id: number): Observable<Movie> {

    return this.httpClient.get<Movie>(`${this.movieApi}/findById/${id}`);
  }

  createMovie(movie: Movie) {
    return this.httpClient.post(`${this.movieApi}/createMovie`, movie);
  }

  editMovie(id: number, movie: Movie) {
    return this.httpClient.put(`${this.movieApi}/updateMovie/${id}`, movie);
  }

  deleteMovie(id: number) {
    return this.httpClient.delete(`${this.movieApi}/deleteMovie/${id}`);
  }
}
