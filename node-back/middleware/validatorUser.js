import { body } from 'express-validator';
import { validatorError } from './validatorErr.js';

export const validatorLogin = [
  body('nickname')
    .trim()
    .notEmpty()
    .isLength({ max: 10 })
    .withMessage('10글자 내로 입력하세요'),
  body('password')
    .trim()
    .isLength({ min: 4 })
    .withMessage('4글자 이상 입력하세요'),
  validatorError,
];
export const validatorSignUp = [
  ...validatorLogin,
  [
    body('name').trim().notEmpty().withMessage('잘못 입력하였습니다'),
    body('email').trim().isEmail().withMessage('이메일의 형식에 맞지 않습니다'),
  ],
  validatorError,
];
// 이메일과 비밀번호 둘 중 하나만 바꿀 수도 있어서, 회원 수정의 유효성 검사는 프론트에 넘김
export const validatorUpdate = [
  body('password').trim(),
  // .isLength({ min: 4 })
  // .withMessage('4글자 이상 입력하세요'),
  body('email').trim(),
  // .isEmail().withMessage('이메일의 형식에 맞지 않습니다'),
  validatorError,
];
export const validatorResign = [...validatorLogin];

export const validatorFindPass = [
  body('name').trim().notEmpty().withMessage('잘못 입력하였습니다'),
  body('email').trim().isEmail().withMessage('이메일의 형식에 맞지 않습니다'),
];

export const validatorUpdatePass = [
  body('password')
    .trim()
    .isLength({ min: 4 })
    .withMessage('4글자 이상 입력하세요'),
];
export const validatorInspect = [
  body('nickname')
    .trim()
    .notEmpty()
    .isLength({ max: 10 })
    .withMessage('10글자 내로 입력하세요'),
];
