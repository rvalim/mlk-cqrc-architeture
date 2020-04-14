import Joi from "joi";

export const accessSchema = Joi.object().keys({
  route: Joi.string().required(),
  method: Joi.string().required()
});
