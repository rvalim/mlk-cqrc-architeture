import Joi from "joi";

export const grantSchema = Joi.object().keys({
  roleId: Joi.string().required(),
  actionId: Joi.string().required(),
  resourceId: Joi.string().required(),
  attrs: Joi.string().required(),
});
