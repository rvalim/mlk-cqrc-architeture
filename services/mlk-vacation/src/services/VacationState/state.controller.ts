import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { VacationState } from "../../models/VacationState";
import { stateSchema } from "./state.schema";

export default class StateController extends BaseController<VacationState> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const states = await VacationState.findById<VacationState>(
        req.params.id,
        {
          include: [VacationState]
        });
      res.status(200).json(states);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, stateSchema
      );
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const state = await VacationState.create<VacationState>(req.body);
      state.save();
      res.status(201).json(state);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const states = await VacationState.findAll<VacationState>({
        where: {
          ...req.query || {}
        },
        include: [VacationState]
      });
      res.status(200).json(states);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, stateSchema
      );
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const state = await VacationState.findById<VacationState>(req.params.id);
      state.text = req.body.text || state.text;
      state.text = req.body.nextStateId || state.nextStateId;
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
      const state = await VacationState.findById<VacationState>(req.params.id);
      state.destroy();
      res.status(200).json(state);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
