import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { VacationConfig } from "../../models/VacationConfig";
import { configSchema } from "./config.schema";

export default class ConfigController extends BaseController<VacationConfig> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entities = await VacationConfig.findById<VacationConfig>(
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
      const validateSchema = Joi.validate(req.body, configSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const entity = await VacationConfig.create<VacationConfig>(req.body);
      entity.save();
      res.status(201).json(entity);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const entities = await VacationConfig.findAll<VacationConfig>({
        where: {
          ...req.query || {}
        },
      });
      res.status(200).json(entities);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, configSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entity = await VacationConfig.findById<VacationConfig>(req.params.id);
      entity.key = req.body.key || entity.key;
      entity.description = req.body.description || entity.description;
      entity.value = req.body.value || entity.value;
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
      const entity = await VacationConfig.findById<VacationConfig>(req.params.id);
      entity.destroy();
      res.status(200).json(entity);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
