import { Component, OnInit } from '@angular/core';
import { ReviewDataService } from '../review-data.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = [];
  displayedColumns: string[] = ['movieName', 'dateWatched', 'rating', 'comments'];
  dataSource = new MatTableDataSource<any>();
  filterOptions: string[] = [
    'Highest to Lowest Rated',
    'Lowest to Highest Rated',
    'Movies A-Z',
    'Movies Z-A',
    'Latest Watched',
    'Earliest Watched'
  ];
  selectedFilter: string = '';

  constructor(private reviewDataService: ReviewDataService) {}

  ngOnInit() {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      this.reviews = JSON.parse(storedReviews);
      this.dataSource.data = this.reviews;
    }

    this.reviewDataService.formData$.subscribe(formData => {
      if (formData) {
        const existingReviewIndex = this.reviews.findIndex(review =>
          review.movieName === formData.movieName &&
          review.dateWatched === formData.dateWatched &&
          review.rating === formData.rating &&
          review.comments === formData.comments
        );
        if (existingReviewIndex === -1) {
          this.reviews.push({
            movieName: formData.movieName,
            dateWatched: formData.dateWatched,
            rating: formData.rating,
            comments: formData.comments
          });
          this.dataSource.data = this.reviews;
          localStorage.setItem('reviews', JSON.stringify(this.reviews));
        }
      }
    });
  }

  sortReviews(): void {
    switch (this.selectedFilter) {
      case 'Highest to Lowest Rated':
        this.reviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'Lowest to Highest Rated':
        this.reviews.sort((a, b) => a.rating - b.rating);
        break;
      case 'Movies A-Z':
        this.reviews.sort((a, b) => a.movieName.localeCompare(b.movieName));
        break;
      case 'Movies Z-A':
        this.reviews.sort((a, b) => b.movieName.localeCompare(a.movieName));
        break;
      case 'Latest Watched':
        this.reviews.sort((a, b) => new Date(b.dateWatched).getTime() - new Date(a.dateWatched).getTime());
        break;
      case 'Earliest Watched':
        this.reviews.sort((a, b) => new Date(a.dateWatched).getTime() - new Date(b.dateWatched).getTime());
        break;
      default:
        break;
    }
    this.dataSource.data = this.reviews;
  }
}
