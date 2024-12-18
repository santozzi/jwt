import {Router}from 'express';
import {signup,profile,signin} from '../controllers/auth.controller';
import { verifyTokenMiddleware } from '../middleware/verifytoken';
const router:Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', verifyTokenMiddleware  ,profile);

export default router;