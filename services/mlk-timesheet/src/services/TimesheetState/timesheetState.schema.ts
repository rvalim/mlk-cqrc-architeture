import Joi from "joi";

export const timesheetStateSchema = Joi.object().keys({
  text: Joi.string().required()
});
