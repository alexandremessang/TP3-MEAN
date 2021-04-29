import * as mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  title: String,
  author: String,
  likes: Number,
  parent: String,
  isPublic: Boolean,
  language: String,
  content: String,
});

const File = mongoose.model('File', Schema);

export default File;
