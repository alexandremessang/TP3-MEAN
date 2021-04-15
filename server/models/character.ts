import * as mongoose from 'mongoose';

const characterShema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number
});

const Character = mongoose.model('Character', characterShema);

export default Character;
