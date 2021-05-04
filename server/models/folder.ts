import * as mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: String,
  parent: String,
  isPublic: Boolean,
  level: Number,
  folders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "folder"
    }
  ],
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "file"
    }
  ],
});

const Folders = mongoose.model('folders', Schema);

export default Folders;
