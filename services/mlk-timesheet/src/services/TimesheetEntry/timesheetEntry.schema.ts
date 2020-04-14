import Joi from "joi";

export const timesheetEntrySchema = Joi.object().keys({
  userId: Joi.number().required(),
  timesheetStateId: Joi.number().required(),
  date: Joi.date().required(),
  description: Joi.string().required(),
  hours: Joi.number().required(),
});

export const timesheetEntryEditSchema = Joi.object().keys({
  description: Joi.string().required(),
  hours: Joi.number().required(),
});
