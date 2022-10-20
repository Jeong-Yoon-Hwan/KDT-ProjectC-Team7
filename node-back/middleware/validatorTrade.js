import { body } from 'express-validator';
import { validatorError } from './validatorErr.js';

const vMarketCoin = [
  body('marketCoin')
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('1글자 이상 입력해주세요.'),
];
const vCount = [
  body('count')
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('1글자 이상 입력해주세요.'),
];

export const minuteCandle = [
  body('minutes')
    .notEmpty()
    .isLength({ max: 120 })
    .withMessage('120분 봉 이하만 입력해주세요.'),
  validatorError,
  ...vMarketCoin,
  ...vCount,
];
export const dayCandle = [...vMarketCoin, ...vCount];
export const currentPrice = [...vMarketCoin];
export const bidAsk = [...vMarketCoin];
export const account = [
  body('accessKey').notEmpty().withMessage('1글자 이상 입력해주세요.'),
  body('secretKey').notEmpty().withMessage('1글자 이상 입력해주세요.'),
  validatorError,
];
export const orderInfo = [...account, ...vMarketCoin];
export const findChart = [
  body('name')
    .notEmpty()
    .isLength({ min: 1, max: 10 })
    .withMessage('마켓 이름을 한국어로 올바르게 입력해주세요'),
  validatorError,
];
