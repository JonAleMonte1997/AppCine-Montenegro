import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { CartService } from 'src/app/services/cart.service';
import { MovieService } from 'src/app/services/movie.service';

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
    classifield: '',
    rate: 0,
    duration: 0,
    price: 0
  };

  constructor(
    private movieService: MovieService, 
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];

    this.movieService.getDetail(id).subscribe(
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
  }
}
