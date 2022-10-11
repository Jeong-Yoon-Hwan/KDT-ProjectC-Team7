import express from 'express';
import { playerLoad, videoFile } from '../controller/player.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();
router.get('/', isAuth, playerLoad); //  서버주소/player에 접속하면 영상이 바로 재생됨
router.get('/video', isAuth, videoFile);
export default router;
