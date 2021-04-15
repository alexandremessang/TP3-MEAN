import * as express from 'express';

import CatCtrl from './controllers/cat';
import CharCtrl from './controllers/character';
import MovieCtrl from './controllers/movie';
import UserCtrl from './controllers/user';

function setRoutes(app): void {
  const router = express.Router();
  const catCtrl = new CatCtrl();
  const characterCtrl = new CharCtrl();
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
