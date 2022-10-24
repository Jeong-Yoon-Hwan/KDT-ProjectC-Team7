import * as chatDb from '../data/chat.js';
import * as userDb from '../data/auth.js';
import { getTime } from '../src/getToday.js';

export async function allNickM(req, res) {
  const nickname = req.body.nickname;
  const ifUser = await (nickname
    ? chatDb.allNickM(nickname)
    : chatDb.getChatList());
  return res.status(200).json(ifUser);
}

export async function sendText(req, res, next) {
  const { nickname, text } = req.body;
  const findNick = await userDb.findNickname(nickname);
  if (!findNick) {
    return res.status(404).json({ message: '가입 먼저 해주세요' });
  } else {
    const newM = await chatDb.sendText({
      nickname,
      text,
      //writeTime: Date().toString(),
      writeTime : getTime(),
      repoTime: Date.now().toString(),
    });
    return res.status(200).json(newM);
  }
}

export async function delText(req, res, next) {
  const { nickname, repoTime } = req.body;
  const delText = await chatDb.findMessage(nickname, repoTime);
  if (!delText) {
    return res.status(404).json({ message: '삭제할 수 없습니다' });
  } else {
    await chatDb.delText(nickname, repoTime);
    res.status(200).json({ message: '삭제 완료!' });
  }
}
