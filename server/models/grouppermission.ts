import * as mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  idUser: String,
  idGroup: String,
  grouprole:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "grouprole"
    }
});

const Grouppermission = mongoose.model('grouppermission', Schema);

export default Grouppermission;
