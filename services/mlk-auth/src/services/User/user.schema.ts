import Joi from "joi";

export const userCreateSchema = Joi.object().keys({
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  roleId: Joi.number().required(),
});

export const userLoginSchema = Joi.object().keys({
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required()
});

export const userTokenSchema = Joi.object().keys({
  token: Joi.string().required()
});

export const userUpdatePwSchema = Joi.object().keys({
  oldPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).required(),
  newPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required()
});
