import express from 'express';
import { upbitChart } from '../controller/chart.js';
const router = express.Router();
router.get('/upbit', upbitChart);
export default router;
//# sourceMappingURL=chart.js.map