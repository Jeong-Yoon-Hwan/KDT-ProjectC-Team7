import { DataTypes } from 'sequelize';
import { sqz } from '../database/mysql.js';

export const Chat = sqz.define(
  'chats',
  {
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
  },
  { timestamps: false }
);

// 현재까지 진행된 채팅 목록 가져오기
export async function getChatList() {
  return Chat.findAll().then((data) => {
    return data;
  });
}

export async function getNick(nickname) {
  return Chat.findOne({ where: { nickname } }).then((data) => {
    return data;
  });
}
export async function findMessage(nickname, repoTime) {
  return Chat.findOne({ where: { nickname, repoTime } });
}
// 유저별 보낸 메시지 가져오기
export async function allNickM(nickname) {
  return Chat.findAll({ where: { nickname } }).then((data) => {
    return data;
  });
}

export async function sendText(newM) {
  return Chat.create(newM);
}

export async function delText(nickname, repoTime) {
  return Chat.findOne({ where: { nickname, repoTime } }).then((data) => {
    data.destroy();
  });
}
