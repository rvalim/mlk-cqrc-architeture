import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { entityTypeSchema } from "./entityType.schema";
import { EntityType } from "../../models/EntityType";
import { paginate, setTotalCount } from "../../utils/general";

export default class EntityTypeController extends BaseController<EntityType> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, entityTypeSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const entityType = await EntityType.create<EntityType>(req.body);
      entityType.save();
      res.status(201).json(entityType);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entityTypes = await EntityType.findById<EntityType>(req.params.id);
      res.status(200).json(entityTypes);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const entityType = await EntityType.findAndCountAll<EntityType>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<EntityType>(res, entityType);
      res.status(200).json(entityType.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, entityTypeSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entityType = await EntityType.findById<EntityType>(req.params.id);
      entityType.text = req.body.text;
      entityType.save();
      res.status(200).json(entityType);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entityType = await EntityType.findById<EntityType>(req.params.id);
      entityType.destroy();
      res.status(200).json(entityType);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
