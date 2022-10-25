import path from 'path';
import { Request, Response, NextFunction } from 'express';
const currentDir = path.resolve();

export async function autobot(req: Request, res: Response) {
  return res.sendFile(currentDir + '/download/botDown.py');
}

export async function downPage(req: Request, res: Response) {
  return res.sendFile(currentDir + '/client/download.html');
}
