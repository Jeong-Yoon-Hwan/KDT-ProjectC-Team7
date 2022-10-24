import path from 'path';
const currentDir = path.resolve();

export async function autobot(req, res) {
  return res.sendFile(currentDir + '/download/botDown.py');
}

export async function downPage(req, res) {
  return res.sendFile(currentDir + '/client/download.html');
}
