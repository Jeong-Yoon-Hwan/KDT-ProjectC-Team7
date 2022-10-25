import express from 'express';
import { fileList, upload, uploadConfirm, upLoadClient, } from '../controller/upload.js';
import { isAuth } from '../middleware/auth.js';
const router = express.Router();
router.get('/', isAuth, fileList); // admin만 현재 업로드 된 파일들을 확인할 수 있음
router.post('/', upload.single('file'), uploadConfirm); // admin만 접근 가능하도록 처리
router.get('/upup', upLoadClient);
export default router;
//# sourceMappingURL=upload.js.map