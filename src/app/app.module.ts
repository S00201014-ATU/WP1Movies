import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HttpClientModule } from '@angular/common/http';
import { SafeUrlPipe } from './safe-url.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppMaterialModule } from './app-material.module';
import { MatSelectModule } from '@angular/material/select';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule }from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailsComponent,
    FavouritesComponent,
    SafeUrlPipe,
    NavbarComponent,
    SearchComponent,
    WatchlistComponent,
    ReviewsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
