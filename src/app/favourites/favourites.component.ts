import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../../movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: number[] = [];
  favouriteMovies: Movie[] = [];
  noMoviesSelected: boolean = false;
  selectedSortOption: string = ''; // Updated default sort option

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    const favouritesStr = localStorage.getItem('favourites');
    if (favouritesStr) {
      this.favourites = JSON.parse(favouritesStr);
      if (this.favourites.length > 0) {
        this.fetchFavouriteMovies();
      } else {
        this.noMoviesSelected = true;
      }
    } else {
      this.noMoviesSelected = true;
    }
  }

  fetchFavouriteMovies(): void {
    for (const movieId of this.favourites) {
      this.movieService.getMovieDetails(movieId).subscribe(data => {
        this.favouriteMovies.push(data);
      });
    }
  }

  removeFavourite(movieId: number): void {
    const index = this.favourites.indexOf(movieId);
    if (index !== -1) {
      this.favourites.splice(index, 1);
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
      this.favouriteMovies = this.favouriteMovies.filter(movie => movie.id !== movieId);
    }
    alert("Removed from favourites");
  }

  sortFavouriteMovies(): void {
    switch (this.selectedSortOption) {
      case 'title-asc':
        this.favouriteMovies.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
        break;
      case 'title-desc':
        this.favouriteMovies.sort((a, b) => (b.title ?? '').localeCompare(a.title ?? ''));
        break;
      case 'release-date-asc':
        this.favouriteMovies.sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case 'release-date-desc':
        this.favouriteMovies.sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'runtime-asc':
        this.favouriteMovies.sort((a, b) => (a.runtime ?? 0) - (b.runtime ?? 0));
        break;
      case 'runtime-desc':
        this.favouriteMovies.sort((a, b) => (b.runtime ?? 0) - (a.runtime ?? 0));
        break;
      case 'vote-average-asc':
        this.favouriteMovies.sort((a, b) => (a.vote_average ?? 0) - (b.vote_average ?? 0));
        break;
      case 'vote-average-desc':
        this.favouriteMovies.sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
        break;
    }
  }
}
