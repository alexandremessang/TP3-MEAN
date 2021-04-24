import * as express from 'express';

import CatCtrl from './controllers/cat';
import CharCtrl from './controllers/character';
import FolderCtrl from './controllers/folder';
import FileCtrl from './controllers/file';
import MovieCtrl from './controllers/movie';
import UserCtrl from './controllers/user';

function setRoutes(app): void {
  const router = express.Router();
  const catCtrl = new CatCtrl();
  const characterCtrl = new CharCtrl();
  const folderCtrl = new FolderCtrl();
  const fileCtrl = new FileCtrl();
  const movieCtrl = new MovieCtrl();
  const userCtrl = new UserCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Characters
  router.route('/characters').get(characterCtrl.getAll);
  router.route('/characters/count').get(characterCtrl.count);
  router.route('/character').post(characterCtrl.insert);
  router.route('/character/:id').get(characterCtrl.get);
  router.route('/character/:id').put(characterCtrl.update);
  router.route('/character/:id').delete(characterCtrl.delete);

  // Folders
  router.route('/folders').get(folderCtrl.getAll);
  router.route('/folders/count').get(folderCtrl.count);
  router.route('/folders').post(folderCtrl.insert);
  router.route('/folders/:id').get(folderCtrl.get);
  router.route('/folders/:id').put(folderCtrl.update);
  router.route('/folders/:id').delete(folderCtrl.delete);

  // Files
  router.route('/files').get(fileCtrl.getAll);
  router.route('/files/count').get(fileCtrl.count);
  router.route('/files').post(fileCtrl.insert);
  router.route('/files/:id').get(fileCtrl.get);
  router.route('/files/:id').put(fileCtrl.update);
  router.route('/files/:id').delete(fileCtrl.delete);

  // Movies
  router.route('/movies').get(movieCtrl.getAll);
  router.route('/movies/count').get(movieCtrl.count);
  router.route('/movie').post(movieCtrl.insert);
  router.route('/movie/:id').get(movieCtrl.get);
  router.route('/movie/:id').put(movieCtrl.update);
  router.route('/movie/:id').delete(movieCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default setRoutes;
