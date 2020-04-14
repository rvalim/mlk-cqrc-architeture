import Joi from "joi";
import { join } from "bluebird";

export const typeSchema = Joi.object().keys({
  text: Joi.string().required(),
  numDays: Joi.number().required()
});
