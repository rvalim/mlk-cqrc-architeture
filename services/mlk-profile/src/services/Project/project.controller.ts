import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { Project } from "../../models/Project";
import { projectSchema } from "./project.schema";
import { paginate, setTotalCount } from "../../utils/general";

export default class ProjectController extends BaseController<Project> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, projectSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const project = await Project.create<Project>(req.body);
      project.save();
      res.status(201).json(project);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const projects = await Project.findById<Project>(
        req.params.id,
        {
          include: [{ all: true }]
        }
      );
      res.status(200).json(projects);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await Project.findAndCountAll<Project>(
        paginate(req, {
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<Project>(res, projects);
      res.status(200).json((projects as any).rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, projectSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const project = await Project.findById<Project>(req.params.id);
      project.name = req.body.name || project.name;
      project.phone = req.body.phone || project.phone;
      project.skype = req.body.skype || project.skype;
      project.photo = req.body.photo || project.photo;
      project.description = req.body.description || project.description;
      project.costCentre = req.body.costCentre || project.costCentre;
      project.active = req.body.active || project.active;
      project.overtimeAllowed = req.body.overtimeAllowed || project.overtimeAllowed;
      project.chargeable = req.body.chargeable || project.chargeable;
      project.profitable = req.body.profitable || project.profitable;
      project.endDate = req.body.endDate || project.endDate;
      project.entityId = req.body.entityId || project.entityId;
      project.projectTypeId = req.body.projectTypeId || project.projectTypeId;
      project.projectManagerId = req.body.projectManagerId || project.projectManagerId;
      project.projectOwnerId = req.body.projectOwnerId || project.projectOwnerId;
      project.save();
      res.status(200).json(project);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const project = await Project.findById<Project>(req.params.id);
      project.destroy();
      res.status(200).json(project);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
