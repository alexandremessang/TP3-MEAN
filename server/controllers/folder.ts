import folder from '../models/folder';
import BaseCtrl from './base';

class Folder extends BaseCtrl {
  model = folder;

  // getAll = async (req, res) => {
  //   try {
  //       const docs = await this.model.find({})
  //       .populate({
  //           path: 'folders',
  //           populate: { path: 'folders' },
  //       })
  //       .populate({
  //           path: 'files',
  //           populate: { path: 'files' },
  //       })
  //       res.status(200).json(docs);
  //     } catch (err) {
  //       return res.status(400).json({ error: err.message });
  //     }
  // }
}

export default Folder;
