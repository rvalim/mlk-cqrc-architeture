import { Request, Response, NextFunction } from "express";

export type ExpressRequest = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default abstract class BaseController<T> {
  public abstract async create?(req: Request, res: Response, next: NextFunction): Promise<void>;
  //public abstract async get?(req: Request, res: Response, next: NextFunction): Promise<void>;
  public abstract async getById?(req: Request, res: Response, next: NextFunction): Promise<void>;
  // public abstract async put?(req: Request, res: Response, next: NextFunction): Promise<void>;
  //public abstract async delete?(req: Request, res: Response, next: NextFunction): Promise<void>;
}
