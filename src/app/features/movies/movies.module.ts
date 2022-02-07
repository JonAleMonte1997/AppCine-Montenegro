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
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './store/movies.effect';
import { StoreModule } from '@ngrx/store';
import { moviesReducer } from './store/movie.reducer';


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
    ReactiveFormsModule,
    StoreModule.forFeature('movieState', moviesReducer),
    EffectsModule.forFeature([MovieEffects])
  ],
  providers: [
    MovieService
  ]
})
export class MoviesModule { }
