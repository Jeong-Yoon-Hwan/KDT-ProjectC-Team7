import express from 'express';
import * as tradeController from '../controller/trade.js';
import * as vdTrade from '../middleware/validatorTrade.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();
router.post('/wantName', tradeController.wantName);
router.get('/', isAuth, tradeController.marketCode); // 마켓 코드 조회
router.post(
  '/minuteCandle',
  vdTrade.minuteCandle,
  tradeController.minuteCandle
); // 분 캔들 조회
router.post('/dayCandle', isAuth, vdTrade.dayCandle, tradeController.dayCandle); // 일 캔들 조회
router.post(
  '/currentPrice',
  vdTrade.currentPrice,
  tradeController.currentPrice
); //현재가 정보 조회
router.post('/bidAsk', isAuth, vdTrade.bidAsk, tradeController.bidAsk); // 호가 정보 조회
router.post('/account', isAuth, vdTrade.account, tradeController.account); // 전체 계좌 조회
router.post('/orderInfo', isAuth, vdTrade.orderInfo, tradeController.orderInfo); // 주문 가능 정보
export default router;
