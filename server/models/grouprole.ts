import * as mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  readable: Boolean,
  writable: Boolean,
  deletable: Boolean
});

const Grouprole = mongoose.model('grouprole', Schema);

export default Grouprole;
