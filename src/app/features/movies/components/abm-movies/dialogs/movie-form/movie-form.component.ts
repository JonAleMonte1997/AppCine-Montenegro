import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Classified, Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MovieFormComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: Movie,
  ) { }

  currentYear: number = new Date().getFullYear();

  movieForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(null, [Validators.required, Validators.maxLength(120)]),
    year: new FormControl(null, [Validators.min(1888), Validators.max(new Date().getFullYear())]),
    director: new FormControl(null, [Validators.maxLength(80)]),
    gender: new FormControl(null, Validators.required),
    plot: new FormControl(null, Validators.maxLength(1200)),
    poster: new FormControl(null, Validators.maxLength(120)),
    classified: new FormControl(null, Validators.required),
    rate: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    duration: new FormControl(null, Validators.min(0)),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  classifieds: string[] = Object.values(Classified);

  genders: string[] = ["Acción", "Aventura", "Drama", "Comedia", "Romance", "Bélica", "Criminal", "Ciencia ficción"];


  ngOnInit(): void {

    if (this.movie) {
      this.movieForm.setValue(this.movie);
    }
  }

  createMovie() {

    if (this.movieForm.valid) {

      this.movie = this.movieForm.value;

      this.dialogRef.close(this.movie);

    } else {

      /************************************************************************************************************************************************
        Si el formulario es inválido al presionar el botón de submit, recorro todos los controladores y cambio la  propiedad touched y dirty a true
        para que aparezcan los mensajes de error si no se realizo focus o click en los inputs anteriormente.
      **************************************************************************************************************************************************/

      Object.keys(this.movieForm.controls).forEach(controlName => {
        this.movieForm.get(controlName)?.markAsTouched({onlySelf: true});
        this.movieForm.get(controlName)?.markAsDirty({onlySelf: true});
      });
    }
  }

  hasError(controlName: string): boolean {
    let control = this.movieForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
