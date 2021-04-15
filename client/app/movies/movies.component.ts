import { Component, OnInit } from '@angular/core';

import { MovieService } from '../services/movie.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Movie } from '../shared/models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movie = new Movie();
  movies: Movie[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private movieService: MovieService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getmovies();
  }

  getmovies(): void {
    this.movieService.getMovies().subscribe(
      data => this.movies = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(movie: Movie): void {
    this.isEditing = true;
    this.movie = movie;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.movie = new Movie();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the movies to reset the editing
    this.getmovies();
  }

  editmovie(movie: Movie): void {
    this.movieService.editMovie(movie).subscribe(
      () => {
        this.isEditing = false;
        this.movie = movie;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deletemovie(movie: Movie): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.movieService.deleteMovie(movie).subscribe(
        () => {
          this.movies = this.movies.filter(elem => elem._id !== movie._id);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
