import path from 'path';
const currentDir = path.resolve();

export async function downloadOne(req, res) {
  return res.sendFile(currentDir + '/download/botDown.py');
}
