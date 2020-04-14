import Joi from "joi";
import { join } from "bluebird";

export const holidaySchema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().required(),
  date: Joi.date().required(),
  country: Joi.string().required()
});
