import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { Holiday } from "../../models/Holiday";
import { holidaySchema } from "./holiday.schema";
import Sequelize = require('sequelize');

export default class HolidayController extends BaseController<Holiday> {
  public async createFromBroker?(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const states = await Holiday.findByPk<Holiday>(req.params.id);
      res.status(200).json(states); 
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getByRange(req: Request, res: Response, next: NextFunction) {
    let Holidays = require('date-holidays');
    const hd = new Holidays({country: req.query.country});
    const Op = Sequelize.Op;

    enum HolidayOrigin{
      External = 1,
      Internal = 2
    }

    try {
      if (!req.query.startDate) {
        throw new Error("Missing Start Date");
      }
      if (!req.query.endDate) {
        throw new Error("Missing End Date"); 
      }
      if (!req.query.country) {
        throw new Error("Missing Country");
      }

      const holidays: any[] = [];

      const dbHoliday = await Holiday.findAll({
        where: {
          date: {
            [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)], 
          },
          country: req.query.country
        }
      });

      dbHoliday.forEach(value => {
        value.dataValues['origin'] = HolidayOrigin.Internal;
      });

      holidays.push(dbHoliday);

      const startDate = new Date(req.query.startDate); 
      const endDate = new Date(req.query.endDate);

      if (startDate.getFullYear() === endDate.getFullYear()) {
        const externalHoliday = hd.getHolidays(startDate);

        externalHoliday.filter(x => new Date(x.date) >= startDate && new Date(x.date) <= endDate);

        externalHoliday.forEach(value => {
          value['origin'] = HolidayOrigin.External;
        });

        holidays.push(externalHoliday);

      } else {
        const startYear = startDate.getFullYear();
        const externalHoliday: any[] = [];

        for(let i = startYear; i <= endDate.getFullYear(); i++) {
          externalHoliday.push(hd.getHolidays(i));
        }

        externalHoliday.forEach(value => {
          value['origin'] = HolidayOrigin.External;
        });

        externalHoliday.reduce((prev, acc) =>
          prev.concat(acc), []).filter(x => new Date(x.date) >= startDate && new Date(x.date) <= endDate);
        holidays.push(externalHoliday);
      }

      res.status(200).json(holidays.reduce((prev, acc) =>
          prev.concat(acc), []).filter(x => new Date(x.date) >= startDate && new Date(x.date) <= endDate));
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getByDate(req: Request, res: Response, next: NextFunction) {
    let Holidays = require('date-holidays')

    try {
      if (!req.query.date) {
        throw new Error("Missing Date");
      }
      if (!req.query.country) {
        throw new Error("Missing Country");
      }

      const externalHoliday = new Holidays({country: req.query.country}).isHoliday(new Date(req.query.date));

      if (!externalHoliday) {
        const dbHoliday = await Holiday.findOne<Holiday>(
        {
          where: {
            date: req.query.date,
            country: req.query.country
          }
        });
        res.status(200).json(dbHoliday);
      } else {
        res.status(200).json(externalHoliday);
      }
    } catch (e) {
      sendError(res, 500, e);
    }
  }


  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, holidaySchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }

      const state = await Holiday.create<Holiday>(req.body);
      state.save();
      res.status(201).json(state);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const states = await Holiday.findAll<Holiday>();
      res.status(200).json(states);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, holidaySchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const holiday = await Holiday.findById<Holiday>(req.params.id)
      holiday.name = req.body.name
      holiday.type = req.body.type
      holiday.date = req.body.date
      holiday.country = req.body.country

      holiday.save();
      res.status(200).json(holiday);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const state = await Holiday.findById<Holiday>(req.params.id);
      state.destroy();
      res.status(200).json(state);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
