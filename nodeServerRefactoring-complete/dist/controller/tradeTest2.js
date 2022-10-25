//Todo 다르게 시도해봐도 실패, 이 코드에서의 에러메세지는 jwt의 보안키를 문제 삼는데, 해결점이 안 보임
import request from 'request';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import urlencode from 'urlencode';
function callPost(url, any1, any2) {
    return request.post(url, any1, any2);
}
function postRequest(url, headers, data) {
    if (headers) {
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
    }
    if (data) {
        data = JSON.stringify(data); //나중에 확인
    }
    const resp = callPost(url, (headers = headers), (data = data));
    data = resp.toJSON(); // 나중에 확인
    return data;
}
class Upbit {
    constructor(access, secret) {
        this.access = access;
        this.secret = secret;
    }
    requestHeaders(query = null) {
        const payload = {
            access_key: this.access,
            nonce: String(uuidv4()),
        };
        if (!query) {
            const m = crypto.createHash('sha512').update(urlencode(query));
            const queryHash = m.digest('hex');
            payload['query_hash'] = queryHash;
            payload['query_hash_alg'] = 'SHA512';
        }
        const token = jwt.sign({ payload }, config.jwt.secretKey, {
            algorithm: 'HS512',
        });
        const authorization = `Bearer ${token}`;
        let headers = { Authorization: authorization };
        return headers;
    }
    marketOrder(market, side, price) {
        const url = config.upbit.upbitUrl;
        let data = { market, side, price, ord_type: 'price' };
        let headers = this.requestHeaders(data);
        const result = postRequest(url, (headers = headers), (data = data));
        return result;
    }
}
const access_Key = config.upbit.accessKey;
const secret_Key = config.upbit.secretKey;
const upbit = new Upbit(access_Key, secret_Key);
upbit.marketOrder('KRW_XRP', 'bid', 6000);
//# sourceMappingURL=tradeTest2.js.map