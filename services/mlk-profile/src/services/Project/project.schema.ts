import Joi from "joi";

export const projectSchema = Joi.object().keys({
  name: Joi.string().required(),
  phone: Joi.string(),
  skype: Joi.string(),
  photo: Joi.string(),
  description: Joi.string(),
  costCentre: Joi.string(),
  active: Joi.bool(),
  overtimeAllowed: Joi.bool(),
  chargeable: Joi.bool(),
  profitable: Joi.bool(),
  endDate: Joi.date(),
  entityId: Joi.number(),
  projectTypeId: Joi.number(),
  projectManagerId: Joi.number(),
  projectOwnerId: Joi.number(),
});
