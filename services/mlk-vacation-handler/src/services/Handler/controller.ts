import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { vacationSchema, workflowSchema, workflowCancelSchema } from "./schema";
import { validate } from '../../validation/creationValidation'
import * as vRequest from "../../validation/services/VacationRequest";
import * as wfValidation from "../../validation/workflowValidation";
import { Vacation } from "../../models/Vacation";
import { CustomException } from "../../validation/customExpection";
import jwt from "jsonwebtoken";

export default class VacationController extends BaseController<Vacation> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, vacationSchema);

      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }

      const body = {
        ...req.body,
        userId: jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString(),
      }

      await validate(body)

      const result = await vRequest.create(body)
    
      res.status(201).json(result)
    } catch (e) {
      if (e instanceof CustomException)
        res.status(400).json(JSON.parse(e.message));
      else
        sendError(res, 500, e);
    }
  }

  public async approve(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, workflowSchema);

      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }

      const body = {
        ...req.body,
        userId: jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString(),
      }

      const result = await wfValidation.approve(body)

      res.status(201).json(result)
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async reprove(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, workflowSchema);

      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }

      const body = {
        ...req.body,
        userId: jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString(),
      }

      const result = await wfValidation.reprove(body)

      res.status(201).json(result)
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, workflowCancelSchema);

      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }

      const body = {
        ...req.body,
        userId: jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString(),
      }

      const result = await wfValidation.cancel(body)

      res.status(201).json(result)
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
