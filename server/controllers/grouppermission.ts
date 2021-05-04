import grouppermission from '../models/grouppermission';
import BaseCtrl from './base';

class Grouppermission extends BaseCtrl {
  model = grouppermission;

  getAll = async (req, res) => {
    try {
        const docs = await this.model.find({})
        res.status(200).json(docs);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
  }
}

export default Grouppermission;
