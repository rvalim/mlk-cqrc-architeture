import { Router, Application } from "express";
import BaseController from "./baseController";
import BaseRouter from "./baseRouter";
import { throwError } from "../utils/Error";

export default abstract class BaseService<T> {
  private _controller: BaseController<T> | null;
  private _router: BaseRouter<T> | null;

  constructor(private _routePrefix: string) {
    this._controller = null;
    this._router = null;
  }

  get controller() {
    return this._controller;
  }

  get router() {
    return this._router;
  }

  public registerController(controller: BaseController<T>): BaseController<T> {
    this._controller = controller;
    return this._controller;
  }

  public registerRouter(router: BaseRouter<T>, app?: Application): BaseRouter<T> {
    this._router = router;
    if (app) {
      this.registerRoutes(app);
    }
    return this._router;
  }

  private getRouterRoutes(): Router {
    if (!this._router) {
      throwError("Cannot register routes from an undefined router");
    }
    return this._router.registerRoutes();
  }

  private registerRoutes(app: Application) {
    app.use(this._routePrefix, this.getRouterRoutes());
  }
}
