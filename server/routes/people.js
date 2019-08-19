import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import PeopleControllers from '../controllers/people';

const api = 'people';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/people
router.get('/', PeopleControllers.find);

router.post('/', PeopleControllers.add);

export default router;