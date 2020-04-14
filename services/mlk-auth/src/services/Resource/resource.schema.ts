import Joi from "joi";

export const resourceSchema = Joi.object().keys({
  text: Joi.string().required()
});
