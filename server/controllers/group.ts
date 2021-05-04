import group from '../models/group';
import BaseCtrl from './base';

class Group extends BaseCtrl {
  model = group;

  getAll = async (req, res) => {
    try {
        const docs = await this.model.find({})
        .populate({
            path: 'grouppermissions',
            populate: { path: 'grouppermission' },
        })
        res.status(200).json(docs);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
  }
}

export default Group;
