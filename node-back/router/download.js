import express from 'express';
import { downloadOne } from '../controller/download.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', downloadOne); // 접속하면 자동매매 파일을 받을 수 있게함.

export default router;
