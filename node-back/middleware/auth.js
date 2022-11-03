import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export async function isAuth(req, res, next) {
  const getToken = req.headers['authorization'];
  if (!getToken) {
    return res.status(401).json({ message: '검증할 수 없습니다' });
  }
  const bearer = getToken.split(' ')[0];
  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: '검증할 수 없습니다' });
  }
  const token = getToken.split(' ')[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decode) => {
    if (error) {
      return res.status(401).json({ message: '유효한 토큰이 아닙니다' });
    } else {
      return res.status(200).json({ message: decode.nickname });
    }
    next();
  });
}
