import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { Vacation } from "../../models/Vacation";
import { VacationState } from "../../models/VacationState";
import { VacationWorflowLog } from "../../models/VacationWorflowLog";
import { vacationSchema, workflowSchema, workflowCancelSchema } from "./vacation.schema";
import { getStateById, getStateByKey, setWorkflow, addWorkflowLog } from './utils'
import { Op } from 'sequelize'
import { SIGKILL } from "constants";
import jwt from "jsonwebtoken";

export default class VacationController extends BaseController<Vacation> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const id = req.params.id
      const entity = await Vacation.find(
        {
          where: { id },
          include: [{ model: VacationWorflowLog, as: 'history' }]
        }
      );
      res.status(200).json(entity);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getAllByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.userId) {
        throw new Error("Missing User ID");
      }

      console.log(req.params)

      const vacations = await Vacation.findAndCountAll(
        {
          where: { userId: req.params.userId },
        }
      );

      res.status(200).json(vacations);
    } catch (e) {
      sendError(res, 500, e);
    }
  }


  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, vacationSchema);

      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }

      const stateId = (await getStateByKey('Pending')).id
      const { userId, typeId, dates } = req.body;
      let list = dates.map(d => { return { date: d, userId, stateId, typeId } });

      const result = await Vacation
        .bulkCreate<Vacation>(list, { returning: true })
        .then(rows => {
          const records = {
            vacationIds: rows.map(p => p.id),
            stateId,
            userId,
            comment: null
          }

          addWorkflowLog('P', records)

          return rows
        });

      res.status(201).json(result);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = jwt.decode(req.headers.authorization, { complete: true })["payload"]["id"].toString()

      const { from, to } = req.params

      const entities = await Vacation.findAll<Vacation>({
        where: {
          userId,
          date: { [Op.between]: [from, to] }
        },
      });

      res.status(200).json(entities);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getByRange(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, from, to } = req.params
      const entities = await Vacation.findAll<Vacation>({
        where: {
          userId,
          date: { [Op.between]: [from, to] }
        },
      });

      res.status(200).json(entities);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getUsersByVacationId(req: Request, res: Response, next: NextFunction) {
    try {

      const idArr = req.query.ids.map(id => parseInt(id))

      const vacations = await Vacation.findAll<Vacation>({
        where: {
          id: idArr,
        },
        attributes: ['userId'] 
      })

      const userIds = [];
      vacations.forEach(v => {
        userIds.includes(v.dataValues.userId) ? null : userIds.push(v.dataValues.userId);
      })

      res.status(200).json(userIds)
    } catch (e) {
      sendError(res, 500, e);      
    }
  }

  public async approve(req: Request, res: Response, next: NextFunction) {    
    try {
      const validateSchema = Joi.validate(req.body, workflowSchema);

      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }

      const { actualStateId } = req.body;
      const state = (await getStateById(actualStateId))
      const affectedRows = await setWorkflow(state.nextStateId, 'A', req.body)

      res.status(200).json(affectedRows);
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

      const newStateId = (await getStateByKey('Reproved')).id
      const affectedRows = await setWorkflow(newStateId, 'R', req.body);

      res.status(200).json(affectedRows);
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

      console.log(req.body)

      const stateId = (await getStateByKey('Cancelled')).id
      const affectedRows = await setWorkflow(stateId, 'C', req.body)

      res.status(200).json(affectedRows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
