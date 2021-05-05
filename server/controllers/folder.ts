import folder from '../models/folder';
import BaseCtrl from './base';

class Folder extends BaseCtrl {
  model = folder;

  getAll = async (req, res) => {
    try {
        const docs = await this.model.find({})
        .populate({
            path: 'folders',
            populate: { path: 'folders' },
        })
        .populate({
            path: 'files',
            populate: { path: 'files' },
        })
        res.status(200).json(docs);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
  }

  // Insert
  insert = async (req, res) => {
    try {
      if(req.body.parent === "root") {
        const obj = await new this.model(req.body).save();
        res.status(201).json(obj);
      } else {
        const newFolder = await new this.model(req.body).save();
        const obj = await this.model.findOneAndUpdate({_id: req.body.parent}, {$push: { folders: newFolder._id}}, { useFindAndModify: false });
        console.log(obj);
        res.status(201).json(newFolder);
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Get by id
  get = async (req, res) => {
    try {
      const obj = await this.model.findOne({ _id: req.params.id })
      .populate({
        path: 'folders',
        populate: { path: 'folders' },
    })
    .populate({
        path: 'files',
        populate: { path: 'files' },
    })
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default Folder;
