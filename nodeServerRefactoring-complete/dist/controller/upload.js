var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import multer from 'multer';
import 'express-async-errors';
import path from 'path';
import fs from 'fs';
import { getToday } from '../util/getToday.js';
// todo multer 함수가 희한한 구조라서 정밀한 에러 핸들링이 어려움. 안 되는 건 500 으로 처리.
const uploadDir = path.resolve() + '/dist/upload';
fs.mkdir(uploadDir, (err) => {
    if (err && err.code === 'EEXIST')
        console.error;
});
const currentDir = path.resolve();
export function upLoadClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.sendFile(currentDir + '/client/upload.html');
    });
}
export function fileList(req, res) {
    fs.readdir(uploadDir, (error, file) => {
        if (error) {
            res.status(500).json({ message: '검색이 불가능합니다' });
        }
        else if (file.length < 1) {
            res.status(200).json({ message: '저장된 파일이 없습니다' });
        }
        else {
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
export const uploadConfirm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json('업로드가 완료됐습니다');
});
//# sourceMappingURL=upload.js.map