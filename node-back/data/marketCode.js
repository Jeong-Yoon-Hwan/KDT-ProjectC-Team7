import { data } from './marketCodeAll.js';

export function findCode(name) {
  const names = data.find((e) => e.korean_name === name);
  return names.market;
}

// console.log(findCode('비트코인'));
