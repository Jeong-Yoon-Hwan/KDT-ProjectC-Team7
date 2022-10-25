import { DataTypes, Model, Optional } from 'sequelize';
import { sqz } from '../database/mysql.js';

declare interface CustomAttributes {
  id: number;
  name: string;
  nickname: string;
  password: string;
  email: string;
  created: string;
}
declare interface CreationAttributes extends Optional<CustomAttributes, 'id'> {}

declare interface ModelCustom
  extends Model<CustomAttributes, CreationAttributes> {
  nickname: string;
  password: string;
  email: string;
}

export const User = sqz.define<ModelCustom>(
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

export async function findNickname(nickname?: string) {
  return User.findOne({ where: { nickname } });
}

export async function newUsers(user: any) {
  return User.create(user);
}

export async function findPass(name: string, email: string) {
  return User.findOne({ where: { name, email } }).then((data) => {
    return data;
  });
}

export async function updatePass(nickname: string, password: string) {
  return User.findOne({ where: { nickname } }).then((changeData) => {
    changeData.password = password;
    return changeData.save();
  });
}

export async function updateUser(
  nickname: string,
  password: string,
  email: string
) {
  return User.findOne({ where: { nickname } }).then((changeData) => {
    changeData.email = email;
    changeData.password = password;
    return changeData.save();
  });
}

export async function delUser(nickname: string, password: string) {
  return User.findOne({ where: { nickname, password } }).then((data) => {
    data.destroy();
  });
}
