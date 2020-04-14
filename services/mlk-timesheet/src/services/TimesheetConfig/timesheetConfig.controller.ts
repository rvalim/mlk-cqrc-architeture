import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { TimesheetConfig } from "../../models/TimesheetConfig";
import { timesheetConfigSchema } from "./timesheetConfig.schema";

export default class TimesheetConfigController extends BaseController<TimesheetConfig> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const config = await TimesheetConfig.findById<TimesheetConfig>(req.params.id);
      res.status(200).json(config);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const config = await TimesheetConfig.findAll<TimesheetConfig>();
      res.status(200).json(config);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, timesheetConfigSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const config = await TimesheetConfig.findById<TimesheetConfig>(req.params.id);
      config.closedStateId = req.body.closedStateId || config.closedStateId;
      config.save();
      res.status(200).json(config);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method not implemented");
  }
}
