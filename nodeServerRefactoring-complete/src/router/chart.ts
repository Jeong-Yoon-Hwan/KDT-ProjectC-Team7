import express from 'express';
import { upbitChart } from '../controller/chart.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();
router.get('/upbit', upbitChart);

export default router;
