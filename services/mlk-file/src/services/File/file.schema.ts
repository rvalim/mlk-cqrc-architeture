import Joi from "joi";

export const fileSchema = Joi.object().keys({
  userId: Joi.string().required(),
});

export const fileUpdateSchema = Joi.object().keys({
  fullName: Joi.string(),
  skype: Joi.string(),
  photo: Joi.string(),
  weeklyWorkLoad: Joi.number(),
  userManagerId: Joi.number(),
  birtdate: Joi.date(),
  endDate: Joi.date(),
});
