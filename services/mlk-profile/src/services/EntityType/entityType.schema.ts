import Joi from "joi";

export const entityTypeSchema = Joi.object().keys({
  text: Joi.string().required()
});
