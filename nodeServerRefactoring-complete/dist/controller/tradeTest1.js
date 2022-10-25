// Todo 매매기능 직접 구현 실패, 공식 홈페이지에서조차도 틀린 코드가 올라와 있음
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import urlEncode from 'urlencode';
import axios from 'axios';
export function bidAsk(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { market, side, price } = req.body;
        const body = {
            market,
            side,
            price,
            ord_types: 'price',
        };
        const query = urlEncode(body);
        const hash = crypto.createHash('sha512');
        const queryHash = hash.update(query, 'utf-8').digest('hex');
        const payload = {
            access_key: config.upbit.accessKey,
            nonce: String(uuidv4()),
            query_hash: queryHash,
            query_hash_alg: 'SHA512',
        };
        const token = jwt.sign(payload, config.jwt.secretKey);
        const options = {
            method: 'POST',
            url: config.upbit.upbitUrl + '/v1/orders/',
            headers: { Authorization: `Bearer ${token}` },
            json: body,
        };
        yield axios(options);
        return res.status(200).json({ message: '성공' });
    });
}
//# sourceMappingURL=tradeTest1.js.map