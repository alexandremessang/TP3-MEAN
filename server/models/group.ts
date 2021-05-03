import * as mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  owner: String,
  libelle: String,
  grouppermissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "grouppermissions"
    }
  ]
});

const Group = mongoose.model('groups', Schema);

export default Group;
