import path from 'path';

const currentDir = path.resolve();

export async function upbitChart(req, res) {
  return res.sendFile(currentDir + '/client/coinChart.html');
}
