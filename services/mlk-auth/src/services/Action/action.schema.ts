import Joi from "joi";

export const actionSchema = Joi.object().keys({
  text: Joi.string().required()
});
