import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { getToday } from '../src/getToday.js';
import * as userDb from '../data/auth.js';

const salt = Number(config.bcrypt.salt);

export async function findNick(req, res) {
  const nick = await userDb.findNickname(req.body.nickname);
  if (nick) {
    return res.status(200).json({ search: true });
  } else {
    return res.status(404).json({ search: false });
  }
}

export async function inspect(req, res, next) {
  const getToken = req.headers['authorization'];
  const token = getToken.split(' ')[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decode) => {
    if (error) {
      return res.status(401).json({ message: '유효한 토큰이 아닙니다' });
    } else {
      return res.status(200).json({ message: decode.nickname });
    }
  });
}

function createToken(nickname) {
  return jwt.sign({ nickname }, config.jwt.secretKey, {
    expiresIn: config.jwt.expires,
  });
}
export async function authLogin(req, res) {
  const { nickname, password } = req.body;
  const user = await userDb.findNickname(nickname);
  if (!user) {
    return res.status(401).json({ message: '찾을 수 없습니다' });
  }
  const bcryptPassword = await bcrypt.compare(password, user.password);
  if (!bcryptPassword) {
    return res.status(401).json({ message: '찾을 수 없습니다' });
  } else {
    const token = createToken(user.nickname);
    return res.status(200).json({ nickname, token });
  }
}

export async function authSignUp(req, res) {
  const { name, nickname, email, password } = req.body;
  const findNick = await userDb.findNickname(nickname);
  if (findNick) {
    return res.status(409).json({ message: '이미 해당 회원이 존재합니다' });
  } else {
    const hashed = await bcrypt.hash(password, salt);
    const signUp = await userDb.newUsers({
      name,
      nickname,
      password: hashed,
      email,
      created: getToday(),
    });
    const token = createToken(signUp);
    return res.status(201).json({ nickname, token });
  }
}
export async function findPass(req, res, next) {
  const { name, email } = req.body;
  const findPass = await userDb.findPass(name, email);
  if (findPass) {
    return res.status(200).json({ nickname: findPass.nickname });
  }
  return res.status(404).json({ message: '찾을 수 없습니다' });
}

export async function updatePass(req, res, next) {
  const { nickname, password } = req.body;
  const hashed = await bcrypt.hash(password, salt);
  const chPass = await userDb.updatePass(nickname, hashed);
  if (chPass) {
    return res.status(200).json(chPass);
  } else {
    return res.status(404).josn({ message: '실패하였습니다. ' });
  }
}

function defaultKey(reqkey, key, another) {
  if (!reqkey) {
    return another;
  } else {
    return key;
  }
}

export async function updateUser(req, res, next) {
  const { nickname, password, email } = req.body;
  const findNick = await userDb.findNickname(nickname);
  const hashed = await bcrypt.hash(password, salt);
  const chMem = await userDb.updateUser(
    nickname,
    defaultKey(req.body.password, hashed, findNick.password),
    defaultKey(req.body.email, email, findNick.email)
  );
  if (chMem) {
    return res.status(200).json(chMem);
  } else {
    return res.status(404).json({ message: '회원 정보를 찾을 수 없습니다.' });
  }
}

export async function delUser(req, res, next) {
  const { nickname, password } = req.body;
  const delId = await userDb.findNickname(nickname);
  if (!delId) {
    return res.status(404).json({ message: '삭제할 회원을 찾을 수 없습니다.' });
  }
  const bcryptPassword = await bcrypt.compare(password, delId.password);
  if (!bcryptPassword) {
    return res.status(401).json({ message: '찾을 수 없습니다' });
  } else {
    await userDb.delUser(nickname, delId.password);
    res.status(200).json({ message: '다음에 또 가입해주세요!!' });
  }
}
