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
export const User = sqz.define('users', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    nickname: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    created: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
}, { timestamps: false });
export function findNickname(nickname) {
    return __awaiter(this, void 0, void 0, function* () {
        return User.findOne({ where: { nickname } });
    });
}
export function newUsers(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return User.create(user);
    });
}
export function findPass(name, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return User.findOne({ where: { name, email } }).then((data) => {
            return data;
        });
    });
}
export function updatePass(nickname, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return User.findOne({ where: { nickname } }).then((changeData) => {
            changeData.password = password;
            return changeData.save();
        });
    });
}
export function updateUser(nickname, password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return User.findOne({ where: { nickname } }).then((changeData) => {
            changeData.email = email;
            changeData.password = password;
            return changeData.save();
        });
    });
}
export function delUser(nickname, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return User.findOne({ where: { nickname, password } }).then((data) => {
            data.destroy();
        });
    });
}
//# sourceMappingURL=auth.js.map