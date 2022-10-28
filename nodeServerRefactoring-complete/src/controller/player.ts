import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const currentDir = path.resolve();

export async function playerLoad(req: Request, res: Response) {
  return res.sendFile(currentDir + '/dist/client/player.html');
}

export async function videoFile(req: Request, res: Response) {
  const range = await req.headers.range;
  if (!range) {
    res.status(400).json({ message: '영상을 재생할 수 없습니다' });
  }

  const videoPath = currentDir + '/dist/video/ppap.mp4';
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
}
