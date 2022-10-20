import { ExchangeService, QuoationService } from 'node-upbit';
import { findCode } from '../data/marketCode.js';

// 마켓 코드 한글 검색
export async function wantName(req, res) {
  const name = req.body.name;
  const find = findCode(name);
  if (!find) {
    return res.status(404).json({ message: '해당 종목이 없습니다' });
  } else {
    return res.status(200).json(find);
  }
}
/* 인증키가 필요 없음 */
const quoationService = new QuoationService();

//마켓 코드 조회
export async function marketCode(req, res) {
  const marketCode = await quoationService.getMarketAllInfo();

  if (!marketCode) {
    return res.status(404).json({ message: '조회할 수 없습니다.' });
  } else {
    return res.status(200).json(marketCode);
  }
}

// 분 캔들 조회
export async function minuteCandle(req, res) {
  const { minutes, marketCoin, count } = req.body;
  const minuteCandle = await quoationService.getMinutesCandles({
    minutes,
    marketCoin,
    count: parseInt(count),
  });
  if (!minuteCandle) {
    return res.status(404).json({ message: '조회할 수 없습니다.' });
  } else {
    return res.status(200).json(minuteCandle);
  }
}

// 일 캔들 조회
export async function dayCandle(req, res, next) {
  const { marketCoin, count } = req.body;
  const dayCandle = await quoationService.getDayCandles({
    marketCoin: marketCoin,
    count: parseInt(count),
  });
  console.log(dayCandle);
  if (!dayCandle) {
    return res.status(404).json({ message: '조회할 수 없습니다.' });
  } else {
    return res.status(200).json(dayCandle);
  }
}
// 현재가 정보 조회
export async function currentPrice(req, res) {
  const marketCoin = req.body.marketCoin;
  const currentPrice = await quoationService.getTicker([marketCoin]);
  if (!currentPrice) {
    return res.status(404).json({ message: '조회할 수 없습니다.' });
  } else {
    return res.status(200).json(currentPrice);
  }
}
// 호가 정보 조회
export async function bidAsk(req, res) {
  const marketCoin = req.body.marketCoin;
  const bidAsk = await quoationService.getOrderbook([marketCoin]);
  if (!bidAsk) {
    return res.status(404).json({ message: '조회할 수 없습니다.' });
  } else {
    return res.status(200).json(bidAsk);
  }
}

/*  인증키가 필요 */
//전체 계좌 조회
export async function account(req, res) {
  const { accessKey, secretKey } = req.body;
  const exchangeService = new ExchangeService(accessKey, secretKey);
  const account = await exchangeService.getAllAccount();
  if (!account) {
    return res.status(404).json({ message: '조회할 수 없습니다.' });
  } else {
    return res.status(200).json(account);
  }
}

//주문 가능 정보
export async function orderInfo(req, res) {
  const { accessKey, secretKey, marketCoin } = req.body;
  const exchangeService = new ExchangeService(accessKey, secretKey);
  const orderInfo = await exchangeService.getOrderChance(marketCoin);
  if (!orderInfo) {
    return res.status(404).json({ message: '조회할 수 없습니다.' });
  } else {
    return res.status(200).json(orderInfo);
  }
}
