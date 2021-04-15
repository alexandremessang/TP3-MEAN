import * as mongoose from 'mongoose';

const movieShema = new mongoose.Schema({
  title: String,
  date: Date
});

const Movie = mongoose.model('Movie', movieShema);

export default Movie;
