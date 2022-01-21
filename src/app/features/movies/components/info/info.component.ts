import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classified, Movie } from 'src/app/models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartState } from 'src/app/features/cart/store/cart-store.model';
import { Store } from '@ngrx/store';
import { cartAddMovie } from 'src/app/features/cart/store/cart.actions';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  movie: Movie = {
    title: '',
    year: 0,
    director: '',
    gender: [],
    plot: '',
    poster: '',
    classified: Classified.G,
    rate: 0,
    duration: 0,
    price: 0
  };

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<CartState>
  ) { }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];

    this.movieService.getMovie(id).subscribe(
      res => {
        if (res) {
          this.movie = res;
        }
      }
    );
  }

  getMovieTimeDuration(): string {
    let hour: number = Math.floor(this.movie.duration / 60);
    let minutes: number = this.movie.duration - 60*hour;

    return `${hour}h ${minutes}m`;
  }

  addToCart() {
    let movieToAdd = this.movie;
    this.store.dispatch(cartAddMovie({movie: movieToAdd}));

    this.snackBar.open('Añadido al carrito', undefined, {
      horizontalPosition: 'end',
      duration: 3000
    })
  }
}
