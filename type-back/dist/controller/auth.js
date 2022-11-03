var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { getToday } from '../util/getToday.js';
import * as userDb from '../data/auth.js';
const salt = Number(config.bcrypt.salt);
export function findNick(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const nick = yield userDb.findNickname(req.body.nickname);
        if (nick) {
            return res.status(200).json({ search: true });
        }
        else {
            return res.status(404).json({ search: false });
        }
    });
}
export function inspect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const getToken = req.headers['authorization'];
        const token = getToken.split(' ')[1];
        jwt.verify(token, config.jwt.secretKey, (error, decode) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                return res.status(401).json({ message: '유효한 토큰이 아닙니다' });
            }
            else {
                return res.status(200).json({ message: decode.nickname });
            }
        }));
    });
}
function createToken(nickname) {
    return jwt.sign({ nickname }, config.jwt.secretKey, {
        expiresIn: config.jwt.expires,
    });
}
export function authLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nickname, password } = req.body;
        const user = yield userDb.findNickname(nickname);
        if (!user) {
            return res.status(401).json({ message: '찾을 수 없습니다' });
        }
        const bcryptPassword = yield bcrypt.compare(password, user.password);
        if (!bcryptPassword) {
            return res.status(401).json({ message: '찾을 수 없습니다' });
        }
        else {
            const token = createToken(user.nickname);
            return res.status(200).json({ nickname, token });
        }
    });
}
export function authSignUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, nickname, email, password } = req.body;
        const findNick = yield userDb.findNickname(nickname);
        if (findNick) {
            return res.status(409).json({ message: '이미 해당 회원이 존재합니다' });
        }
        else {
            const hashed = yield bcrypt.hash(password, salt);
            const signUp = yield userDb.newUsers({
                name,
                nickname,
                password: hashed,
                email,
                created: getToday(),
            });
            const token = createToken(signUp);
            return res.status(201).json({ nickname, token });
        }
    });
}
export function findPass(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email } = req.body;
        const findPass = yield userDb.findPass(name, email);
        if (findPass) {
            return res.status(200).json({ nickname: findPass.nickname });
        }
        return res.status(404).json({ message: '찾을 수 없습니다' });
    });
}
export function updatePass(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nickname, password } = req.body;
        const hashed = yield bcrypt.hash(password, salt);
        const chPass = yield userDb.updatePass(nickname, hashed);
        if (chPass) {
            return res.status(200).json(chPass);
        }
        else {
            return res.status(404).json({ message: '실패하였습니다. ' });
        }
    });
}
function defaultKey(reqkey, key, another) {
    if (!reqkey) {
        return another;
    }
    else {
        return key;
    }
}
export function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nickname, password, email } = req.body;
        const findNick = yield userDb.findNickname(nickname);
        const hashed = yield bcrypt.hash(password, salt);
        const chMem = yield userDb.updateUser(nickname, defaultKey(req.body.password, hashed, findNick.password), defaultKey(req.body.email, email, findNick.email));
        if (chMem) {
            return res.status(200).json(chMem);
        }
        else {
            return res.status(404).json({ message: '회원 정보를 찾을 수 없습니다.' });
        }
    });
}
export function delUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nickname, password } = req.body;
        const delId = yield userDb.findNickname(nickname);
        if (!delId) {
            return res.status(404).json({ message: '삭제할 회원을 찾을 수 없습니다.' });
        }
        const bcryptPassword = yield bcrypt.compare(password, delId.password);
        if (!bcryptPassword) {
            return res.status(401).json({ message: '찾을 수 없습니다' });
        }
        else {
            yield userDb.delUser(nickname, delId.password);
            res.status(200).json({ message: '다음에 또 가입해주세요!!' });
        }
    });
}
//# sourceMappingURL=auth.js.map