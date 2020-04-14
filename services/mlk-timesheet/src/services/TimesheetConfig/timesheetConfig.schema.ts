import Joi from "joi";

export const timesheetConfigSchema = Joi.object().keys({
  closedStateId: Joi.number()
});
