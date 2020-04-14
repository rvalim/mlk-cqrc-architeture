import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { VacationType } from "../../models/VacationType";
import { typeSchema } from "./type.schema";

export default class TypeController extends BaseController<VacationType> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entities = await VacationType.findById<VacationType>(
        req.params.id,
        {
        });
      res.status(200).json(entities);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, typeSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const entity = await VacationType.create<VacationType>(req.body);
      entity.save();
      res.status(201).json(entity);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const entities = await VacationType.findAll<VacationType>({
        where: {
          ...req.query || {}
        }
      });
      res.status(200).json(entities);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, typeSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entity = await VacationType.findById<VacationType>(req.params.id);
      entity.text = req.body.text || entity.text;
      entity.numDays = req.body.numDays || entity.numDays;
      entity.save();
      res.status(200).json(entity);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entity = await VacationType.findById<VacationType>(req.params.id);
      entity.destroy();
      res.status(200).json(entity);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
