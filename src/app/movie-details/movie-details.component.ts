import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../../movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;
  similarMovies: Movie[] = [];
  isInWatchlist: boolean = false;
  activeAccordion: string | null = null;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.movieService.getMovieDetails(movieId).subscribe(data => {
        this.movie = data;
        console.log('Movie Data:', this.movie);
        console.log('Videos:', this.movie?.videos);
        this.checkWatchlist();
        this.fetchSimilarMovies(movieId);
      });
    });
  }

  fetchSimilarMovies(movieId: number): void {
    this.movieService.getSimilarMovies(movieId).subscribe(data => {
      this.similarMovies = data.results;
    });
  }

  formatGenres(genres: { id: number; name: string }[]): string {
    return genres.map(genre => genre.name).join(', ');
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

   getTrailerUrl(videos: { key: string; name: string; }[] | undefined): string {
    if (!videos) return '';
    const trailer = videos.find(video => video.name.toLowerCase().includes('trailer'));
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';
  }

  checkWatchlist(): void {
    const watchlistStr = localStorage.getItem('watchlist');
    if (watchlistStr) {
      const watchlist: Movie[] = JSON.parse(watchlistStr);
      this.isInWatchlist = watchlist.some(m => m.id === this.movie?.id);
    }
  }

  addToWatchlist(): void {
    let watchlist: Movie[] = [];
    const watchlistStr = localStorage.getItem('watchlist');
    if (watchlistStr) {
      watchlist = JSON.parse(watchlistStr);
    }
    if (this.movie) {
      watchlist.push(this.movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      this.isInWatchlist = true;
    }

    alert("Added to Watchlist")
  }

  toggleAccordion(accordion: string): void {
    if (this.activeAccordion === accordion) {
      this.activeAccordion = null;
    } else {
      this.activeAccordion = accordion;
    }
  }
}
