import file from '../models/file';
import BaseCtrl from './base';

class File extends BaseCtrl {
  model = file;

  getType = function( search ) {
    return search == undefined ? ""
         : search == "undefined" ? ""
         : search == "" ? ""
         : new RegExp(search, 'i')
  }

  getAll = async (req, res) => {
    try {
      // if(this.getType(req.query.search) === "") {
      //   var aggregation = [
      //     { $sort: { [req.query.sort_type]: parseInt(req.query.sort_value)} }
      //   ]
      // } else {
      //   var aggregation = [
      //     { $match: { name: { $regex: this.getType(req.query.search) }} },
      //     { $sort: { [req.query.sort_type]: parseInt(req.query.sort_value)} }
      //   ]
      // }
        const docs = await this.model.find({})//.aggregate(aggregation)
        res.status(200).json(docs);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
  }

  getAllPublic = async (req, res) => {
    try {
      if(this.getType(req.query.language) !== ""){
        const docs = await this.model.find({ language: { $eq : req.query.language }, isPublic : { $eq: true }})
        res.status(200).json(docs);
      }else{
        const docs = await this.model.find({ isPublic : { $eq: true }})
        res.status(200).json(docs);
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default File;
