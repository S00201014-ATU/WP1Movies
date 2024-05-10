import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movie.model';
import { ReviewDataService } from '../review-data.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: Movie[] = [];
  showError: boolean = false;

  constructor(private reviewDataService: ReviewDataService) { }

  ngOnInit(): void {
    this.fetchWatchlist();
  }

  fetchWatchlist(): void {
    const watchlistStr = localStorage.getItem('watchlist');
    if (watchlistStr) {
      const storedWatchlist: Movie[] = JSON.parse(watchlistStr);
      this.watchlist = storedWatchlist.filter((movie, index, self) =>
        index === self.findIndex(m => m.id === movie.id)
      );
      this.watchlist = this.watchlist.filter(movie =>
        movie.poster_path && movie.release_date
      );
      this.watchlist.forEach(movie => movie.showForm = false);
    }
  }

  toggleForm(movie: Movie): void {
    this.watchlist.forEach(m => m.showForm = false);
    movie.showForm = !movie.showForm;
  }

  removeFromWatchlist(movie: Movie): void {
    const index = this.watchlist.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.watchlist.splice(index, 1);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }
    if (this.watchlist.length === 0) {
      this.showError = true;
    }
  }

  submitWatchedForm(movie: Movie): void {
    const formData = {
      movieName: movie.title,
      dateWatched: movie.dateWatched,
      rating: movie.rating,
      comments: movie.feedback
    };

    if (!movie.dateWatched) {
      alert('Please select a date.');
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(movie.dateWatched as string);
    if (isNaN(selectedDate.getTime()) || selectedDate > currentDate) {
      alert('Please select a valid date in the past.');
      return;
    }

    const rating = movie.rating;
    if (rating === undefined || rating < 0 || rating > 10) {
      alert('Please enter a rating between 0 and 10.');
      return;
    }

    if (!movie.feedback) {
      alert('Please provide feedback.');
      return;
    }

    this.reviewDataService.updateFormData(formData);

    const index = this.watchlist.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.watchlist.splice(index, 1);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }

    movie.showForm = false;

    alert(`${movie.title} has been reviewed.`);
  }

  cancelForm(): void {
    this.watchlist.forEach(movie => movie.showForm = false);
  }
}
