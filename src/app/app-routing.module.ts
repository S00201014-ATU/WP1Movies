import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch:'full'},
  {path: 'movies', component: MoviesComponent },
  {path: 'movie/:id', component:MovieDetailsComponent },
  {path: 'favourites', component: FavouritesComponent},
  { path: 'watchlist', component: WatchlistComponent },
  {path: 'reviews', component:ReviewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
