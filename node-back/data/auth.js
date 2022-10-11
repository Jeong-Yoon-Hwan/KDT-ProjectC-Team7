import { DataTypes } from 'sequelize';
import { sqz } from '../database/mysql.js';

export const User = sqz.define(
  'users',
  {
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
  },
  { timestamps: false }
);

export async function findNickname(nickname) {
  return User.findOne({ where: { nickname } });
}

export async function newUsers(user) {
  return User.create(user);
}

export async function findPass(name, email) {
  return User.findOne({ where: { name, email } }).then((data) => {
    return data;
  });
}

export async function updatePass(nickname, password) {
  return User.findOne({ where: { nickname } }).then((changeData) => {
    changeData.password = password;
    return changeData.save();
  });
}

export async function updateUser(nickname, password, email) {
  return User.findOne({ where: { nickname } }).then((changeData) => {
    changeData.email = email;
    changeData.password = password;
    return changeData.save();
  });
}

export async function delUser(nickname, password) {
  return User.findOne({ where: { nickname, password } }).then((data) => {
    data.destroy();
  });
}
