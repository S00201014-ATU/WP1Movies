export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: null;
  genres: { id: number; name: string}[];
  runtime: number;
  videos?: { results: {key: string; name: string}[] };
  similarMovies?: Movie[];
  showForm: boolean;
  dateWatched?: string;
  rating?: number;
  feedback?: string;
}
