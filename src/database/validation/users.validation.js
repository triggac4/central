import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

export const userCreateValidation = Joi.object({
  fullName: Joi.string().required().min(5),
  username: Joi.string().required().min(5),
  password: passwordComplexity(complexityOptions),
  confirmPassword: Joi.ref('password'),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
});
