import { Request, Response, NextFunction } from "express";

export type ExpressRequest = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default abstract class BaseController<T> {
  public abstract async create?(req: Request, res: Response, next: NextFunction): Promise<void>;
}
