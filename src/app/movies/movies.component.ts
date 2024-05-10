import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../../movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  favourites: number[] = [];
  searchQuery: string = '';
  genres: { id: number; name: string }[] = [];
  selectedGenre: string = 'Any';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe(data => {
      this.movies = data.results;
    });

    const favouritesStr = localStorage.getItem('favourites');
    if (favouritesStr) {
      this.favourites = JSON.parse(favouritesStr);
    }

    this.fetchGenres();
  }

  handleSearch(query: string, genreId?: number): void {
    console.log('Search query:', query);
    this.selectedGenre = genreId ? this.genres.find(genre => genre.id === genreId)?.name ?? 'Any' : 'Any';
    if (query.trim() === '') {
      if (genreId) {
        this.movieService.getMoviesByGenre(genreId).subscribe(data => {
          this.movies = data.results;
        });
      } else {
        this.movieService.getPopularMovies().subscribe(data => {
          this.movies = data.results;
        });
      }
    } else {
      this.movieService.searchMovies(query).subscribe(data => {
        this.movies = data.results;
        if (genreId) {
          this.movies = this.movies.filter(movie => movie.genres.some(genre => genre.id === genreId));
        }
      });
    }
  }

  toggleFavourite(movieId: number): void {
    const index = this.favourites.indexOf(movieId);
    const movie = this.movies.find(m => m.id === movieId);
    if (!movie) return;

    if (index === -1) {
      this.favourites.push(movieId);
      alert(`${movie.title} has been added to favorites.`);
    } else {
      this.favourites.splice(index, 1);
      alert(`${movie.title} has been removed from favorites.`);
    }

    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  isFavourite(movieId: number): boolean {
    return this.favourites.includes(movieId);
  }

  fetchGenres(): void {
    this.movieService.getMovieGenres().subscribe(data => {
      this.genres = data.genres;
      this.genres.push({ id: 0, name: 'Any' });
      this.genres.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  filterByGenre(genreId: number): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.selectedGenre = this.genres.find(genre => genre.id === genreId)?.name ?? 'Any';
    if (query === '') {
      this.movieService.getMoviesByGenre(genreId).subscribe(data => {
        this.movies = data.results;
      });
    } else {
      this.movieService.searchMovies(query).subscribe(data => {
        this.movies = data.results.filter(movie => movie.genres.some(genre => genre.id === genreId));
      });
    }
  }
}
