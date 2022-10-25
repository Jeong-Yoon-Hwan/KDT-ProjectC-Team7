var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DataTypes } from 'sequelize';
import { sqz } from '../database/mysql.js';
export const Chat = sqz.define('chats', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nickname: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // 메시지 보낸 시간(new Date())
    writeTime: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    // 메시지마다 구분할 때 사용할 번호(Date.now())
    repoTime: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
}, { timestamps: false });
// 현재까지 진행된 채팅 목록 가져오기
export function getChatList() {
    return __awaiter(this, void 0, void 0, function* () {
        return Chat.findAll().then((data) => {
            return data;
        });
    });
}
export function getNick(nickname) {
    return __awaiter(this, void 0, void 0, function* () {
        return Chat.findOne({ where: { nickname } }).then((data) => {
            return data;
        });
    });
}
export function findMessage(nickname, repoTime) {
    return __awaiter(this, void 0, void 0, function* () {
        return Chat.findOne({ where: { nickname, repoTime } });
    });
}
// 유저별 보낸 메시지 가져오기
export function allNickM(nickname) {
    return __awaiter(this, void 0, void 0, function* () {
        return Chat.findAll({ where: { nickname } }).then((data) => {
            return data;
        });
    });
}
export function sendText(newM) {
    return __awaiter(this, void 0, void 0, function* () {
        return Chat.create(newM);
    });
}
export function delText(nickname, repoTime) {
    return __awaiter(this, void 0, void 0, function* () {
        return Chat.findOne({ where: { nickname, repoTime } }).then((data) => {
            data.destroy();
        });
    });
}
//# sourceMappingURL=chat.js.map