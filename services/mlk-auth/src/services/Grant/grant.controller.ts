import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { Grant } from "../../models/Grant";
import { grantSchema } from "./grant.schema";
import { Role } from "../../models/Role";
import { Resource } from "../../models/Resource";
import { Action } from "../../models/Action";
import { sendError } from "../../utils/Error";
import { paginate, setTotalCount } from "../../utils/general";

export default class GrantController extends BaseController<Grant> {
  public async createFromBroker(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const grant = await Grant.findById<Grant>(
        req.params.id,
        {
          include: [{all: true}]
        });
      res.status(200).json(grant);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, grantSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const grant = await Grant.create<Grant>(req.body);
      grant.save();
      res.status(201).json(grant);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async retrieveACL() {
    const grants = await Grant.findAll<Grant>({include: [Role, Resource, Action]});
    return grants.map((g: Grant) => {
      return {
        role: g.role.text,
        resource: g.resource.text,
        action: g.action.text,
        attributes: g.attrs
      };
    });
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const grants = await Grant.findAndCountAll<Grant>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<Grant>(res, grants);
      res.status(200).json(grants.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, grantSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const grant = await Grant.findById<Grant>(req.params.id);
      grant.actionId = req.body.actionId || grant.actionId;
      grant.resourceId = req.body.resourceId || grant.resourceId;
      grant.roleId = req.body.roleId || grant.roleId;
      grant.attrs = req.body.attrs || grant.attrs;
      grant.save();
      res.status(200).json(grant);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const grant = await Grant.findById<Grant>(req.params.id);
      grant.destroy();
      res.status(200).json(grant);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
