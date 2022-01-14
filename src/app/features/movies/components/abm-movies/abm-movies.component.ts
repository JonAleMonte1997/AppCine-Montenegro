import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from '../../services/movie.service';
import { DeleteAlertComponent } from './dialogs/delete-alert/delete-alert.component';
import { MovieFormComponent } from './dialogs/movie-form/movie-form.component';

@Component({
  selector: 'app-abm-movies',
  templateUrl: './abm-movies.component.html',
  styleUrls: ['./abm-movies.component.scss']
})
export class AbmMoviesComponent implements OnInit {

  displayedColumns: string[] = ['title', 'year', 'director', 'actions'];
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      res => this.movies = res
    );
  }

  createMovie() {

    const dialogRef = this.dialog.open(MovieFormComponent, {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let movieToCreate: Movie = res;
        this.movieService.createMovie(movieToCreate).subscribe((res) => {
          console.log(res);
          this.getMovies();
          this.displayNotification('Película creada con éxito');
        },
        err => {
          console.log(err)
        });
      } else
        this.displayNotification('Operación de creación cancelada');
    });
  }

  viewMovie(id: number) {
    this.router.navigate([`info/${id}`]);
  }

  editMovie(movie: Movie) {

    if (movie.id == undefined) {
      return;
    }

    let id: number = movie.id;

    const dialogRef = this.dialog.open(MovieFormComponent, {
      width: '100%',
      data: movie
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let movieToUpdate: Movie = res;
        this.movieService.editMovie(id, movieToUpdate).subscribe(
          () => {
            this.getMovies();
            this.displayNotification('Película editada con éxito');
          }
        );
      } else
        this.displayNotification('Operación de edición cancelada');
    });
  }

  deleteMovie(id: number) {

    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      position: {top: '100px'}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.movieService.deleteMovie(id).subscribe(
          () => {
            this.getMovies();
            this.displayNotification('Borrado con éxito');
          });
      } else
        this.displayNotification('Operación de eliminación cancelada');
    });
  }

  displayNotification(message: string) {

    this.snackBar.open(message, undefined, {
      horizontalPosition: 'end',
      duration: 3000
    })
  }
}
