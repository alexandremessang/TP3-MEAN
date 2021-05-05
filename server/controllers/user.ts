import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import Folder from '../models/folder';
import BaseCtrl from './base';

class UserCtrl extends BaseCtrl {
  model = User;
  modelFolder = Folder;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token });
      });
    });
  }

  //Insert a root folder for every new user
  insert = async (req, res) => {
    try {
      const newFolder = await new this.modelFolder({name: "root", parent: "root"}).save();
      const newUser = await new this.model(req.body).save();
      const obj = await this.model.findOneAndUpdate({_id: newUser._id}, { rootId: newFolder._id}, { new: true});
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default UserCtrl;
