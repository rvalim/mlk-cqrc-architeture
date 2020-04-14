import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import { UserAcc } from "../../models/UserAcc";
import { userCreateSchema, userTokenSchema, userLoginSchema, userUpdatePwSchema } from "./user.schema";
import Joi from "joi";
import { Role } from "../../models/Role";
import { sendError } from "../../utils/Error";
import { validateToken } from "../../utils/JWT";
import ServiceManager, { AppServices } from "../serviceManager";
import { ChannelID } from "../channelService";

export default class UserController extends BaseController<UserAcc> {
  public async createFromBroker(body: object) {
    throw new Error("Method not implemented");
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const user = await UserAcc.findById<UserAcc>(
        req.params.id,
        {
          include: [{ all: true }]
        }
      );
      res.status(200).json(user);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.body, userCreateSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const user = await UserAcc.create<UserAcc>(req.body);
      user.save();

      const channelMgr = ServiceManager.getInstance().get(AppServices.ChannelManager);
      const chan = channelMgr.createChannel(ChannelID.UserCreateAccount);
      channelMgr.sendMessage({user: user.dataValues}, chan, ChannelID.UserCreateAccount);

      res.status(201).json(user);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async validate(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.token) {
        throw new Error("Missing token");
      }
      const isValid = await validateToken(req.query.token);
      if (!isValid) {
        sendError(res, 403);
      } else {
        res.status(200).json({});
      }
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || null;
    const offset = (page - 1) * itemsPerPage;
    // let order = req.query.order ? req.query.order.split(',') : null;

    try {
      const user = await UserAcc.findAndCountAll<UserAcc>({
        where: req.query.where,
        limit: itemsPerPage,
        offset,
        // order: order ? [order] : null
      });

      res.setHeader('X-Total-Count', user.count)
      res.status(200).json(user.rows);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method not implemented");
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        throw new Error("Missing ID");
      }
      const user = await UserAcc.findById<UserAcc>(req.params.id);
      user.destroy();
      res.status(200).json(user);
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async reset(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.query, userUpdatePwSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const token = await UserAcc.updatePassword(
        req.query.oldPassword,
        req.query.newPassword,
        {
          where: {email: req.query.email},
          include: [Role]
        });
      res.status(200).json({
        token
      });
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.query, userLoginSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const token = await UserAcc.findAndGenerateToken(
        req.query.password,
        {
          where: {email: req.query.email},
          include: [Role]
        });
      res.status(200).json({
        token
      });
    } catch (e) {
      sendError(res, 500, e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method not implemented");
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = Joi.validate(req.query, userTokenSchema);
      if (validateSchema.error) {
        throw new Error(validateSchema.error.message);
      }
      const token = await UserAcc.refreshToken(req.query.token);
      res.status(200).json({
        token
      });
    } catch (e) {
      sendError(res, 500, e);
    }
  }
}
