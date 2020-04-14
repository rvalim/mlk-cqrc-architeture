import Joi from "joi";

export const projectTypeSchema = Joi.object().keys({
  text: Joi.string().required()
});
