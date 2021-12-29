import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classifield, Movie } from 'src/app/models/movie.model';
import { CartService } from 'src/app/features/cart/services/cart.service';
import { MovieService } from '../../services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    posterURL: '',
    classifield: Classifield.G,
    rate: 0,
    duration: 0,
    price: 0
  };

  constructor(
    private movieService: MovieService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
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
    this.cartService.add(this.movie);

    this.snackBar.open('Añadido al carrito', undefined, {
      horizontalPosition: 'end',
      duration: 3000
    })
  }
}
