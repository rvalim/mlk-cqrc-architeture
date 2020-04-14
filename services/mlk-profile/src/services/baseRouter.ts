import BaseController from "./baseController";
import { Router } from "express";

export default abstract class BaseRouter<T> {
  constructor(
    protected readonly _controller: BaseController<T>
  ) {}

  public abstract registerRoutes(): Router;
}
