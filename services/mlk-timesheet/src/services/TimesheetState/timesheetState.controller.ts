import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { TimesheetState } from "../../models/TimesheetState";
import { timesheetStateSchema } from "./timesheetState.schema";

export default class TimesheetStateController extends BaseController<TimesheetState> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const states = await TimesheetState.findById<TimesheetState>(
        req.params.id,
        {
          include: [TimesheetState]
        });
      res.status(200).json(states);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, timesheetStateSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const state = await TimesheetState.create<TimesheetState>(req.body);
      state.save();
      res.status(201).json(state);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const states = await TimesheetState.findAll<TimesheetState>({
        where: {
          ...req.query || {}
        },
        include: [TimesheetState]
      });
      res.status(200).json(states);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, timesheetStateSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const state = await TimesheetState.findById<TimesheetState>(req.params.id);
      state.text = req.body.text || state.text;
      state.save();
      res.status(200).json(state);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const state = await TimesheetState.findById<TimesheetState>(req.params.id);
      state.destroy();
      res.status(200).json(state);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
