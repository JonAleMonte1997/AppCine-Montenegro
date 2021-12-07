import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { moviesMock } from './mocks/movies.mock';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovies(genderFilter: string): Observable<Movie[]> {

    //Simulación de la busqueda por genero

    let movies: Movie[] = moviesMock;
    let movieFilter: Movie[];

    if (genderFilter) {

      movieFilter = movies.filter(movie => movie.gender.find(gender => gender === genderFilter));
    } else {

      movieFilter = movies;
    }

    return of(movieFilter);
  }

  getDetail(movieId: number): Observable<Movie | undefined> {

    //Simulación de busqueda por id

    let movies: Movie[] = moviesMock;

    let movie: Movie | undefined = movies.find(movie => movie.id === movieId);

    return of(movie);
  }
}
