import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { Resource } from "../../models/Resource";
import { resourceSchema } from "./resource.schema";
import { sendError } from "../../utils/Error";
import { paginate, setTotalCount } from "../../utils/general";

export default class ResourceController extends BaseController<Resource> {
  public async createFromBroker(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const resource = await Resource.findById<Resource>(req.params.id);
      res.status(200).json(resource);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, resourceSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const resource = await Resource.create<Resource>(req.body);
      resource.save();
      res.status(201).json(resource);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const resources = await Resource.findAndCountAll<Resource>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<Resource>(res, resources);
      res.status(200).json(resources.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, resourceSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const resource = await Resource.findById<Resource>(req.params.id);
      resource.text = req.body.text;
      resource.save();
      res.status(200).json(resource);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const resource = await Resource.findById<Resource>(req.params.id);
      resource.destroy();
      res.status(200).json(resource);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
