import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbmMoviesComponent } from './components/abm-movies/abm-movies.component';
import { InfoComponent } from './components/info/info.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieService } from './services/movie.service';
import { MaterialModule } from 'src/app/material/material.module';
import { MovieFormComponent } from './components/abm-movies/dialogs/movie-form/movie-form.component';
import { DeleteAlertComponent } from './components/abm-movies/dialogs/delete-alert/delete-alert.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AbmMoviesComponent,
    InfoComponent,
    ListMoviesComponent,
    MovieFormComponent,
    DeleteAlertComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    MovieService
  ]
})
export class MoviesModule { }
