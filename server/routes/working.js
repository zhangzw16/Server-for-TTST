import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import WorkingControllers from '../controllers/working';

const api = 'working';
const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/working
router.get('/', WorkingControllers.find);

// POST /api/working
router.post('/', WorkingControllers.add);

// GET /api/working/id?week=**
router.get('/:id', WorkingControllers.findById);

// PUT /api/working/id?week=**
router.put('/:id', WorkingControllers.update);

export default router;