import { data } from './marketCodeAll.js';
export function findCode(name) {
    const names = data.find((e) => e.korean_name === name);
    if (!names) {
        return null;
    }
    else {
        return names.market;
    }
}
// console.log(findCode('비트코인'));
//# sourceMappingURL=marketCode.js.map