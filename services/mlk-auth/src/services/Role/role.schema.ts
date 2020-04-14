import Joi from "joi";

export const roleSchema = Joi.object().keys({
  text: Joi.string().required()
});
