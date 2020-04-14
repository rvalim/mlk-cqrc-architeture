import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { Action } from "../../models/Action";
import { actionSchema } from "./action.schema";
import { sendError } from "../../utils/Error";
import { paginate, setTotalCount } from "../../utils/general";

export default class ActionController extends BaseController<Action> {
  public async createFromBroker(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const action = await Action.findById<Action>(req.params.id);
      res.status(200).json(action);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, actionSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const action = await Action.create<Action>(req.body);
      action.save();
      res.status(201).json(action);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const actions = await Action.findAndCountAll<Action>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<Action>(res, actions);
      res.status(200).json(actions.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, actionSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const action = await Action.findById<Action>(req.params.id);
      action.text = req.body.text;
      action.save();
      res.status(200).json(action);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const action = await Action.findById<Action>(req.params.id);
      action.destroy();
      res.status(200).json(action);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
