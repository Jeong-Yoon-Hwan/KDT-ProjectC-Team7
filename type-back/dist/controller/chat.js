var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as chatDb from '../data/chat.js';
import * as userDb from '../data/auth.js';
import { getTime } from '../util/getToday.js';
export function allNickM(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const nickname = req.body.nickname;
        const ifUser = yield (nickname
            ? chatDb.allNickM(nickname)
            : chatDb.getChatList());
        return res.status(200).json(ifUser);
    });
}
export function sendText(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nickname, text } = req.body;
        const findNick = yield userDb.findNickname(nickname);
        if (!findNick) {
            return res.status(404).json({ message: '가입 먼저 해주세요' });
        }
        else {
            const newM = yield chatDb.sendText({
                nickname,
                text,
                //writeTime: Date().toString(),
                writeTime: getTime(),
                repoTime: Date.now().toString(),
            });
            return res.status(200).json(newM);
        }
    });
}
export function delText(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nickname, repoTime } = req.body;
        const delText = yield chatDb.findMessage(nickname, repoTime);
        if (!delText) {
            return res.status(404).json({ message: '삭제할 수 없습니다' });
        }
        else {
            yield chatDb.delText(nickname, repoTime);
            res.status(200).json({ message: '삭제 완료!' });
        }
    });
}
//# sourceMappingURL=chat.js.map