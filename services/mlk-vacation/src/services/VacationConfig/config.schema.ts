import Joi from "joi";
import { join } from "bluebird";

export const configSchema = Joi.object().keys({
  key: Joi.string().required(),
  description: Joi.string().required(),
  value: Joi.string().required()
});
