import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { TimesheetEntry } from "../../models/TimesheetEntry";
import { timesheetEntrySchema, timesheetEntryEditSchema } from "./timesheetEntry.schema";
import { TimesheetState } from "../../models/TimesheetState";
import jwt from "jsonwebtoken";

export default class TimesheetEntryController extends BaseController<TimesheetEntry> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async owned(req: Request, res: Response, next: NextFunction) {
    try {
      const timesheet = await TimesheetEntry.findAll<TimesheetEntry>({
        where: {
          ...req.query || {},
          userId: jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString()
        },
        include: [TimesheetState]
      });
      if (!timesheet) {
        sendError(res, 401, "Access denied");
      }
      res.status(200).json(timesheet);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async ownedById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const timesheet = await TimesheetEntry.find<TimesheetEntry>({
        where: {
          id: req.params.id,
          userId: jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString()
        },
        include: [TimesheetState]
      });
      if (!timesheet) {
        sendError(res, 401, "Access denied");
      }
      res.status(200).json(timesheet);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const timesheet = await TimesheetEntry.findById<TimesheetEntry>(
        req.params.id,
        {
          include: [TimesheetState]
        });
      res.status(200).json(timesheet);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, timesheetEntrySchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const timesheet = await TimesheetEntry.create<TimesheetEntry>(req.body);
      timesheet.save();
      res.status(201).json(timesheet);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const state = await TimesheetEntry.findAll<TimesheetEntry>({
        where: {
          ...req.query || {}
        },
        include: [TimesheetState]
      });
      res.status(200).json(state);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async transition(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const timesheet = await TimesheetEntry.find<TimesheetEntry>({
        where: {id: req.params.id},
        include: [TimesheetState]
      });
      if (timesheet.timesheetState.nextStateId) {
        timesheet.timesheetStateId = timesheet.timesheetState.nextStateId || timesheet.timesheetStateId;
      }
      timesheet.save();
      res.status(200).json(timesheet);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, timesheetEntryEditSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const timesheet = await TimesheetEntry.find<TimesheetEntry>({
        where: {id: req.body.id},
        include: [TimesheetState]
      });
      if (timesheet.timesheetState.allowEdit) {
        timesheet.description = req.body.description || timesheet.description;
        timesheet.hours = req.body.hours || timesheet.hours;
      }
      timesheet.save();
      res.status(200).json(timesheet);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const timesheet = await TimesheetEntry.findById<TimesheetEntry>(req.params.id);
      timesheet.destroy();
      res.status(200).json(timesheet);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
