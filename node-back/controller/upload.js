import multer from 'multer';
import {} from 'express-async-errors';
import path from 'path';
import fs from 'fs';
import { getToday } from '../src/getToday.js';

// todo multer 함수가 희한한 구조라서 정밀한 에러 핸들링이 어려움. 안 되는 건 500 으로 처리.

const uploadDir = path.resolve() + '/upload';
fs.mkdir(uploadDir, (err) => {
  if (err && err.code === 'EEXIST') console.error;
});

const currentDir = path.resolve();

export async function upLoadClient(req, res) {
  return res.sendFile(currentDir + '/client/upload.html');
}

export function fileList(req, res) {
  fs.readdir(uploadDir, (error, file) => {
    if (error) {
      res.status(500).json({ message: '검색이 불가능합니다' });
    } else if (file.length < 1) {
      res.status(200).json({ message: '저장된 파일이 없습니다' });
    } else {
      res.status(200).json(file);
    }
  });
}

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const fileName = getToday() + file.originalname;
      cb(null, fileName);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },
});

export const uploadConfirm = async (req, res) => {
  res.status(200).json('업로드가 완료됐습니다');
};
