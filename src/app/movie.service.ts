import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = 'f6f1014b979c56f363b8d9240cd01cca';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http:HttpClient) { }

  getPopularMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=videos`);
  }

  getMovieTitle(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=videos`);
  }

  searchMovies(query: string): Observable<{ results: Movie[] }> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.http.get<{ results: Movie[] }>(url);
  }

  getMovieGenres(): Observable<{ genres: { id: number; name: string }[] }> {
    return this.http.get<{ genres: { id: number; name: string }[] }>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }

  getMoviesByGenre(genreId: number): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`);
  }

  getSimilarMovies(movieId: number): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(`${this.baseUrl}/movie/${movieId}/similar?api_key=${this.apiKey}`);
  }

  addToWatchlist(movieId: number): void {
    const watchlistJSON: string | null = localStorage.getItem('watchlist');

    const watchlist: number[] = watchlistJSON ? JSON.parse(watchlistJSON) : [];

    if (!watchlist.includes(movieId)) {
      watchlist.push(movieId);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  }

}

