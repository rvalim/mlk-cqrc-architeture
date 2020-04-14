import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { Entity } from "../../models/Entity";
import { entitySchema } from "./entity.schema";
import { EntityType } from "../../models/EntityType";
import { paginate, setTotalCount } from "../../utils/general";

export default class EntityController extends BaseController<Entity> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, entitySchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const entity = await Entity.create<Entity>(req.body);
      entity.save();
      res.status(201).json(entity);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entity = await Entity.findById<Entity>(
        req.params.id,
        {
          include: [EntityType]
        });
      res.status(200).json(entity);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const entity = await Entity.findAndCountAll<Entity>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<Entity>(res, entity);
      res.status(200).json(entity.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, entitySchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const entity = await Entity.findById<Entity>(req.params.id);
      entity.name = req.body.name || entity.name;
      entity.phone = req.body.phone || entity.phone;
      entity.skype = req.body.skype || entity.skype;
      entity.photo = req.body.photo || entity.photo;
      entity.entityTypeId = req.body.entityTypeId || entity.entityTypeId;
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
      const entity = await Entity.findById<Entity>(req.params.id);
      entity.destroy();
      res.status(200).json(entity);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
