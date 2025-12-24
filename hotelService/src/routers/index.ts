import {Router} from 'express';
import v1Router from './v1/index.router';
import v2Router from './v2/index.router';

const router = Router();

router.use('/api/v1', v1Router);
router.use('/api/v2', v2Router); 

export default router;