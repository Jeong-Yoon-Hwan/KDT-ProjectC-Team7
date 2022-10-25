import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { Request, Response, NextFunction } from 'express';

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const getToken = req.headers['authorization'];
  if (!getToken) {
    return res.status(401).json({ message: '검증할 수 없습니다' });
  }
  const bearer = getToken.split(' ')[0];
  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: '검증할 수 없습니다' });
  }
  const token = getToken.split(' ')[1];
  jwt.verify(token, config.jwt.secretKey, async (error: Error) => {
    if (error) {
      return res.status(401).json({ message: '유효한 토큰이 아닙니다' });
    }
    next();
  });
}
