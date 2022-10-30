import path from 'path';
import { Request, Response, NextFunction } from 'express';
const currentDir = path.resolve();

export async function upbitChart(req: Request, res: Response) {
  return res.sendFile(currentDir + '/dist/client/coinChart.html');
}
