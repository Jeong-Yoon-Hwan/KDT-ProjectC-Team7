import express from 'express';
import { playerLoad, videoFile } from '../controller/player.js';
const router = express.Router();
router.get('/', playerLoad); //  서버주소/player에 접속하면 영상이 바로 재생됨
router.get('/video', videoFile);
export default router;
//# sourceMappingURL=player.js.map