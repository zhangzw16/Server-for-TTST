import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import jwt from '../middlewares/jwt';
import UserControllers from '../controllers/user';

const api = 'userAuth';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/cities
router.get('/', UserControllers.find);

// POST /api/cities
router.post('/', UserControllers.register);

// GET /api/cities/id
// This route is protected, call POST /api/authenticate to get the token
router.get('/:id', jwt, UserControllers.findById);

// PUT /api/cities/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/:id', jwt, UserControllers.update);

// DELETE /api/cities/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/:id', jwt, UserControllers.delete);

export default router;
