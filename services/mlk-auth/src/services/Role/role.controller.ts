import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { Role } from "../../models/Role";
import { roleSchema } from "./role.schema";
import { sendError } from "../../utils/Error";
import { paginate, setTotalCount } from "../../utils/general";

export default class RoleController extends BaseController<Role> {
  public async createFromBroker(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const role = await Role.findById<Role>(req.params.id);
      res.status(200).json(role);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, roleSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const role = await Role.create<Role>(req.body);
      role.save();
      res.status(201).json(role);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await Role.findAndCountAll<Role>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<Role>(res, roles);
      res.status(200).json(roles.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, roleSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const role = await Role.findById<Role>(req.params.id);
      role.text = req.body.text;
      role.save();
      res.status(200).json(role);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const role = await Role.findById<Role>(req.params.id);
      role.destroy();
      res.status(200).json(role);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
