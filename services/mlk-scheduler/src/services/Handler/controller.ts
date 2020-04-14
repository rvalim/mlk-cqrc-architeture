import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { jobSchema, jobUpdateSchema } from "./schema";
import { Bull } from "../../models/Bull";
import * as bullUtil from '../../utils/Bull';
import jwt from 'jsonwebtoken';
import sequelize from 'sequelize';

export default class BullController extends BaseController<Bull> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, jobSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }

      const body = {
        ...req.body,
        userId: jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString(),
      }
      
      const job = await bullUtil.addJob(body.userId, body.jobName, body.data)

      res.status(200).json(job);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      
      // const job = bullUtil.getJobById(req.params['jobId'])

      res.status(200).json({});
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const allJobs = await bullUtil.getJobs();

      res.status(200).json(allJobs);
    } catch (e) {
      sendError(res, 500, e);
    } 
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, jobUpdateSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }

      const { jobId, data } = req.body;

      const job = await bullUtil.updateJob(jobId, data, true)

      const bull = await Bull.find<Bull>({
        where: {
          jobId: sequelize.where(sequelize.fn('LOWER', sequelize.col('jobId')), 'LIKE', `%${jobId}%`)
        }
      })
      bull.data = data;
      bull.save();

      res.status(200).json({redisUpdate: job, db: bull})
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const bull = await Bull.findById(req.params.id);
      bull.destroy();
      res.status(200).json(bull);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
