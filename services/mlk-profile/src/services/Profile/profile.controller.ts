import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import Joi from "joi";
import { sendError } from "../../utils/Error";
import { Profile } from "../../models/Profile";
import { profileSchema, profileUpdateSchema } from "./profile.schema";
import { paginate, setTotalCount } from "../../utils/general";
import jwt from "jsonwebtoken";

export default class ProfileController extends BaseController<Profile> {
  public async createFromBroker(body: object) {
    try {
      const validateSchema = Joi.validate(body, profileSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const profile = await Profile.create<Profile>(body);
      profile.save();
    } catch (e) {
      sendError(null, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method not implemented");
  }
  

  public async getByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString()

      const profile = await Profile.find(
        {
          where: {
            userId
          }
        });

      res.status(200).json(profile);
    } catch (e) {
      console.log(e)
      sendError(res, 500, e);
    }
  }

  public async getMyTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = jwt.decode(req.headers.authorization, {complete: true})["payload"]["id"].toString()
      
      const team = await Profile.findAll<Profile>(
        {
          attributes: ['id', 'fullName'],
          where: {
            userManagerId: userId
          }
        });

      res.status(200).json(team);
    } catch (e) {
      sendError(res, 500, e);
    }
  }


  public async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const profile = await Profile.findOne<Profile>(
        {
          where: {
            userId: req.params.id
          },
          include: [Profile]
        });
      res.status(200).json(profile);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const profile = await Profile.findById<Profile>(
        req.params.id,
        {
          include: [Profile]
        });
      res.status(200).json(profile);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await Profile.findAndCountAll<Profile>(
        paginate(req, {
          include: [Profile],
          where: JSON.parse(<any>req.query.where || null)
        })
      );

      setTotalCount<Profile>(res, profile);
      res.status(200).json(profile.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, profileUpdateSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const profile = await Profile.findById<Profile>(req.params.id);
      profile.fullName = req.body.fullName || profile.fullName;
      profile.phone = req.body.phone || profile.phone;
      profile.skype = req.body.skype || profile.skype;
      profile.weeklyWorkLoad = req.body.weeklyWorkLoad || profile.weeklyWorkLoad;
      profile.birtdate = req.body.birtdate || profile.birtdate;
      profile.endDate = req.body.endDate || profile.endDate;
      profile.photo = req.body.photo || profile.photo;
      profile.userManagerId = req.body.userManagerId || profile.userManagerId;
      profile.save();
      res.status(200).json(profile);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const profile = await Profile.findById<Profile>(req.params.id);
      profile.destroy();
      res.status(200).json(profile);
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
