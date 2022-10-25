var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import path from 'path';
const currentDir = path.resolve();
export function playerLoad(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.sendFile(currentDir + '/client/player.html');
    });
}
export function videoFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const range = yield req.headers.range;
        if (!range) {
            res.status(400).json({ message: '영상을 재생할 수 없습니다' });
        }
        const videoPath = currentDir + '/video/ppap.mp4';
        const videoSize = fs.statSync(videoPath).size;
        const chunk = 3 * 1024 * 1024; // 3메가씩 스트리밍
        const start = parseInt(range.replace(/\D/g, '')); // range 에서 bytes= 를 삭제
        const end = Math.min(start + chunk, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    });
}
//# sourceMappingURL=player.js.map