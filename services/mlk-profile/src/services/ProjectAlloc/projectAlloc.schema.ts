import Joi from "joi";

export const projectAllocCreateSchema = Joi.object().keys({
  projectId: Joi.number().required(),
  profileId: Joi.number().required(),
  startDate: Joi.date(),
  endDate: Joi.date(),
});

export const projectAllocSchema = Joi.object().keys({
  projectId: Joi.number(),
  profileId: Joi.number(),
  startDate: Joi.date(),
  endDate: Joi.date(),
});