import * as mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: String,
  parent: String,
  isPublic: Boolean,
  isFolder: Boolean,
  folders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder"
    }
  ],
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File"
    }
  ],
});

const Folders = mongoose.model('Folder', Schema);

export default Folders;
