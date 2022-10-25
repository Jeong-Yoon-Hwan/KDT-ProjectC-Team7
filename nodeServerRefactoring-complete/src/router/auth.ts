import express from 'express';
import * as vdUser from '../middleware/validatorUser.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/findNick', vdUser.validatorInspect, authController.findNick); // 회원가입시 닉네임이 존재하는 지  실시간 확인
router.post('/inspect', isAuth, authController.inspect); // 5분마다 토큰 검사용
router.post('/login', vdUser.validatorLogin, authController.authLogin); // 로그인
router.post('/signUp', vdUser.validatorSignUp, authController.authSignUp); // 회원가입
router.post('/findPass', vdUser.validatorFindPass, authController.findPass);
router.put(
  '/updatePass',
  vdUser.validatorUpdatePass,
  authController.updatePass
); // 비밀번호 찾기,변경
router.put(
  '/updateUser',
  isAuth,
  vdUser.validatorUpdate,
  authController.updateUser
); // 회원정보수정
router.delete(
  '/resign',
  isAuth,
  vdUser.validatorResign,
  authController.delUser
); // 회원 탈퇴

export default router;
