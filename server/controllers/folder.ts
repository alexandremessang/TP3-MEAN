import folder from '../models/folder';
import file from '../models/file';
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
      let id = req.query.id;
      if(req.body.parent === "root") {
        if(req.body.isFolder) {
          console.log("check");
          const obj = await new this.model(req.body).save();
          res.status(201).json(obj);
        } else {
          // const newFile = await new file(req.body).save();
          const obj = await this.model.findOneAndUpdate({_id: id}, {$push: { files: req.body._id}}, { useFindAndModify: false });
          res.status(201).json(req.body);
        }
      } else {
        if(req.body.isFolder) {
          // const newFolder = await new this.model(req.body).save();
          const obj = await this.model.findOneAndUpdate({_id: id}, {$push: { folders: req.body._id}}, { useFindAndModify: false });
          console.log(obj);
          res.status(201).json(obj);
        } else {
          // const newFile = await new file(req.body).save();
          const obj = await this.model.findOneAndUpdate({_id: id}, {$push: { files: req.body._id}}, { useFindAndModify: false });
          res.status(201).json(req.body);
        }
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
