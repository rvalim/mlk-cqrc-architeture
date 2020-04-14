import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { ProjectAlloc } from "../../models/ProjectAlloc";
import { projectAllocSchema, projectAllocCreateSchema } from "./projectAlloc.schema";
import { paginate, setTotalCount } from "../../utils/general";

export default class ProjectAllocController extends BaseController<ProjectAlloc> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, projectAllocCreateSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const projectAlloc = await ProjectAlloc.create<ProjectAlloc>(req.body);
      projectAlloc.save();
      res.status(201).json(projectAlloc);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const projectAlloc = await ProjectAlloc.findById<ProjectAlloc>(
        req.params.id,
        {
          include: [{ all: true }]
        });
      res.status(200).json(projectAlloc);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const projectAllocs = await ProjectAlloc.findAndCountAll<ProjectAlloc>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<ProjectAlloc>(res, projectAllocs);
      res.status(200).json(projectAllocs.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, projectAllocSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const projectAlloc = await ProjectAlloc.findById<ProjectAlloc>(req.params.id);
      projectAlloc.projectId = req.body.projectId || projectAlloc.projectId;
      projectAlloc.profileId = req.body.profileId || projectAlloc.profileId;
      projectAlloc.startDate = req.body.startDate || projectAlloc.startDate;
      projectAlloc.endDate = req.body.endDate || projectAlloc.endDate;
      projectAlloc.save();
      res.status(200).json(projectAlloc);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const projectAlloc = await ProjectAlloc.findById<ProjectAlloc>(req.params.id);
      projectAlloc.destroy();
      res.status(200).json(projectAlloc);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
