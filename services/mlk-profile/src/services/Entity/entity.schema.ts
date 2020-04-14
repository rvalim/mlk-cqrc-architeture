import Joi from "joi";

export const entitySchema = Joi.object().keys({
  name: Joi.string().required(),
  phone: Joi.string(),
  skype: Joi.string(),
  photo: Joi.string(),
  entityTypeId: Joi.number(),
});
