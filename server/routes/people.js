import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import PeopleControllers from '../controllers/people';

const api = 'people';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/people
router.get('/', PeopleControllers.find);

// POST /api/people
router.post('/', PeopleControllers.add);

// DELETE /api/people/id
router.delete('/:id', PeopleControllers.delete);

export default router;