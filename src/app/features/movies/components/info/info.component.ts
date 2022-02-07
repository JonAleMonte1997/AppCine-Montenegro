import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classified, Movie } from 'src/app/models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartState } from 'src/app/features/cart/store/cart-store.model';
import { select, Store } from '@ngrx/store';
import { cartAddMovie, cartIncreaseMovieAmount } from 'src/app/features/cart/store/cart.actions';
import { Observable, Subscription } from 'rxjs';
import { MovieProduct } from 'src/app/models/cart.model';
import { cartSelector } from 'src/app/features/cart/store/cart.selectors';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

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

  cart$!: Observable<MovieProduct[]>;

  subscription!: Subscription;

  movieIndex: number = -1;

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

    this.cart$ = this.store.pipe(
      select(cartSelector)
    )

    this.subscription = this.cart$.subscribe(cart => {
      this.movieIndex = cart.findIndex(movieProduct => movieProduct.movie.id == id);
    })

  }

  getMovieTimeDuration(): string {
    let hour: number = Math.floor(this.movie.duration / 60);
    let minutes: number = this.movie.duration - 60*hour;

    return `${hour}h ${minutes}m`;
  }

  addToCart() {
    let movieToAdd = this.movie;

    if (this.movieIndex > -1) {
      this.store.dispatch(cartIncreaseMovieAmount({movieIndex: this.movieIndex}));
    } else {
      this.store.dispatch(cartAddMovie({movie: movieToAdd}));
    }

    this.snackBar.open('Añadido al carrito', undefined, {
      horizontalPosition: 'end',
      duration: 3000
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
