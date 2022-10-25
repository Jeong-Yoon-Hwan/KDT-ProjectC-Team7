import express from 'express';
import { autobot, downPage } from '../controller/download.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuth, downPage);
router.get('/autobot', autobot);

export default router;
