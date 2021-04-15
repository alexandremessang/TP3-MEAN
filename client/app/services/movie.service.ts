import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../shared/models/movie.model';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/api/movies');
  }

  countMovies(): Observable<number> {
    return this.http.get<number>('/api/movies/count');
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>('/api/movie', movie);
  }

  getMovie(movie: Movie): Observable<Movie> {
    return this.http.get<Movie>(`/api/movie/${movie._id}`);
  }

  editMovie(movie: Movie): Observable<any> {
    return this.http.put(`/api/movie/${movie._id}`, movie, { responseType: 'text' });
  }

  deleteMovie(movie: Movie): Observable<any> {
    return this.http.delete(`/api/movie/${movie._id}`, { responseType: 'text' });
  }

}
