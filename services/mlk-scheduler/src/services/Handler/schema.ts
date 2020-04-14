import Joi from "joi";
import { join } from "bluebird";

export const jobSchema = Joi.object().keys({
  jobName: Joi.string().required(),
  data: Joi.object(),
  config: Joi.string(),
});

export const jobUpdateSchema = Joi.object().keys({
  jobId: Joi.string().required(),
  data: Joi.object().required()
})
