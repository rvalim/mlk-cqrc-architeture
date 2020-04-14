import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { ProjectType } from "../../models/ProjectType";
import { projectTypeSchema } from "./projectType.schema";
import { paginate, setTotalCount } from "../../utils/general";

export default class ProjectTypeController extends BaseController<ProjectType> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, projectTypeSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const projectType = await ProjectType.create<ProjectType>(req.body);
      projectType.save();
      res.status(201).json(projectType);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const projectType = await ProjectType.findById<ProjectType>(req.params.id);
      res.status(200).json(projectType);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const projectTypes = await ProjectType.findAndCountAll<ProjectType>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<ProjectType>(res, projectTypes);
      res.status(200).json(projectTypes.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, projectTypeSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const projectType = await ProjectType.findById<ProjectType>(req.params.id);
      projectType.text = req.body.text;
      projectType.save();
      res.status(200).json(projectType);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const projectType = await ProjectType.findById<ProjectType>(req.params.id);
      projectType.destroy();
      res.status(200).json(projectType);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
