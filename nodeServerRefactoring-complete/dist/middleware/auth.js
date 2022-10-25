var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
export function isAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const getToken = req.headers['authorization'];
        if (!getToken) {
            return res.status(401).json({ message: '검증할 수 없습니다' });
        }
        const bearer = getToken.split(' ')[0];
        if (bearer !== 'Bearer') {
            return res.status(401).json({ message: '검증할 수 없습니다' });
        }
        const token = getToken.split(' ')[1];
        jwt.verify(token, config.jwt.secretKey, (error) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                return res.status(401).json({ message: '유효한 토큰이 아닙니다' });
            }
            next();
        }));
    });
}
//# sourceMappingURL=auth.js.map