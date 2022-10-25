import { body } from 'express-validator';
import { validatorError } from './validatorErr.js';

export const validatorSendText = [
  body('text')
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('1글자 이상 입력해주세요.'),
  validatorError,
];
