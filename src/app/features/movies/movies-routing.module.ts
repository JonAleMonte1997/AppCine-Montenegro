import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { AbmMoviesComponent } from './components/abm-movies/abm-movies.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListMoviesComponent
  },
  {
    path: 'info/:id',
    component: InfoComponent
  },
  {
    path: 'abm',
    component: AbmMoviesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MoviesRoutingModule { }
