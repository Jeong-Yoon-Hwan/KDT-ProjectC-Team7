import express from 'express';
import * as chatController from '../controller/chat.js';
import * as vdChat from '../middleware/validatorChat.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuth, chatController.allNickM);
router.post('/', vdChat.validatorSendText, chatController.sendText);
router.delete('/', isAuth, chatController.delText);

// 비밀번호 다시 묻기는 프론트에서 해결하기
export default router;
