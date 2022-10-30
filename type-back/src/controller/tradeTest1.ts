// Todo 매매기능 직접 구현 실패, 공식 홈페이지에서조차도 틀린 코드가 올라와 있음

import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import urlEncode from 'urlencode';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
export async function bidAsk(req: Request, res: Response, next: NextFunction) {
  const { market, side, price } = req.body;
  const body: any = {
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
  await axios(options);
  return res.status(200).json({ message: '성공' });
}
