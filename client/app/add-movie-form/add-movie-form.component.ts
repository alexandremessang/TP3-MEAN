import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Movie } from '../shared/models/movie.model';

@Component({
  selector: 'app-add-movie-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.scss']
})

export class AddMovieFormComponent implements OnInit {
  @Input() movies: Movie[];

  addMovieForm: FormGroup;
  title = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);

  constructor(private movieService: MovieService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
      title: this.title,
      date: this.date
    });
  }

  addMovie(): void {
    this.movieService.addMovie(this.addMovieForm.value).subscribe(
      res => {
        this.movies.push(res);
        this.addMovieForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

}
