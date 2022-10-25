var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ExchangeService, QuoationService } from 'node-upbit';
import { findCode } from '../data/marketCode.js';
// 마켓 코드 한글 검색
export function wantName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.name;
        const find = findCode(name);
        if (!find) {
            return res.status(404).json({ message: '해당 종목이 없습니다' });
        }
        else {
            return res.status(200).json(find);
        }
    });
}
/* 인증키가 필요 없음 */
const quoationService = new QuoationService();
//마켓 코드 조회
export function marketCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const marketCode = yield quoationService.getMarketAllInfo();
        if (!marketCode) {
            return res.status(404).json({ message: '조회할 수 없습니다.' });
        }
        else {
            return res.status(200).json(marketCode);
        }
    });
}
// 분 캔들 조회
export function minuteCandle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { minutes, marketCoin, count } = req.body;
        const minuteCandle = yield quoationService.getMinutesCandles({
            minutes,
            marketCoin,
            count: parseInt(count),
        });
        if (!minuteCandle) {
            return res.status(404).json({ message: '조회할 수 없습니다.' });
        }
        else {
            return res.status(200).json(minuteCandle);
        }
    });
}
// 일 캔들 조회
export function dayCandle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { marketCoin, count } = req.body;
        const dayCandle = yield quoationService.getDayCandles({
            marketCoin: marketCoin,
            count: parseInt(count),
        });
        console.log(dayCandle);
        if (!dayCandle) {
            return res.status(404).json({ message: '조회할 수 없습니다.' });
        }
        else {
            return res.status(200).json(dayCandle);
        }
    });
}
// 현재가 정보 조회
export function currentPrice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const marketCoin = req.body.marketCoin;
        const currentPrice = yield quoationService.getTicker([marketCoin]);
        if (!currentPrice) {
            return res.status(404).json({ message: '조회할 수 없습니다.' });
        }
        else {
            return res.status(200).json(currentPrice);
        }
    });
}
// 호가 정보 조회
export function bidAsk(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const marketCoin = req.body.marketCoin;
        const bidAsk = yield quoationService.getOrderbook([marketCoin]);
        if (!bidAsk) {
            return res.status(404).json({ message: '조회할 수 없습니다.' });
        }
        else {
            return res.status(200).json(bidAsk);
        }
    });
}
/*  인증키가 필요 */
//전체 계좌 조회
export function account(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessKey, secretKey } = req.body;
        const exchangeService = new ExchangeService(accessKey, secretKey);
        const account = yield exchangeService.getAllAccount();
        if (!account) {
            return res.status(404).json({ message: '조회할 수 없습니다.' });
        }
        else {
            return res.status(200).json(account);
        }
    });
}
//주문 가능 정보
export function orderInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessKey, secretKey, marketCoin } = req.body;
        const exchangeService = new ExchangeService(accessKey, secretKey);
        const orderInfo = yield exchangeService.getOrderChance(marketCoin);
        if (!orderInfo) {
            return res.status(404).json({ message: '조회할 수 없습니다.' });
        }
        else {
            return res.status(200).json(orderInfo);
        }
    });
}
//# sourceMappingURL=trade.js.map