import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { Access } from "../../models/Access";
import { Resource } from "../../models/Resource";
import { Action } from "../../models/Action";
import { restricted, extractRole } from "../../utils/Restricted";
import { accessSchema } from "./access.schema";
import { paginate, setTotalCount } from "../../utils/general";

export default class AccessController extends BaseController<Access> {
  public async createFromBroker(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const access = await Access.findById<Access>(
        req.params.id,
        {
          include: [{all: true}]
        });
      res.status(200).json(access);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async check(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.route) {
        throw new Error("Missing route");
      }
      if (!req.query.method) {
        throw new Error("Missing method");
      }
      const sanitizedRoute = req.query.route.split("/")[1];
      const access = await Access.find<Access>({
        where: {
          route: `/${sanitizedRoute}`,
          method: req.query.method.toLowerCase()
        },
        include: [Resource, Action]
      });
      console.log("#")
      console.log("sanitizedRoute", sanitizedRoute)
      console.log("req.query.method", req.query.method)
      console.log("req.query.route", req.query.route)
      console.log("access", access)
      console.log("#")
      // if (!access) {
      //   throw new Error("Access denied");
      // }
      const granted = restricted(
        extractRole(req.headers.authorization), access.action.text, access.resource.text);
      console.log("granted", granted)
      // if (!granted) {
      //   sendError(res, 500, "Not allowed");
      // } else {
      res.status(200).json(granted);
      // }
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, accessSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const access = await Access.create<Access>(req.body);
      access.save();
      res.status(201).json(access);
    } catch (err) {
      sendError(res, 500, err)
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const access = await Access.findAndCountAll<Access>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
        );
        
        setTotalCount<Access>(res, access);
        res.status(200).json((access as any).rows);
      } catch (e) {
        sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, accessSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const access = await Access.findById<Access>(req.params.id);
      access.route = req.body.route || access.route;
      access.method = req.body.method || access.method;
      access.action = req.body.action || access.action;
      access.actionId = req.body.actionId || access.actionId;
      access.resource = req.body.resource || access.resource;
      access.resourceId = req.body.resourceId || access.resourceId;
      access.save();
      res.status(200).json(access);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const access = await Access.findById<Access>(req.params.id);
      access.destroy();
      res.status(200).json(access);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}