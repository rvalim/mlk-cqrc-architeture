import BaseService from "../baseService";
import { Application } from "express";
import { Action } from "../../models/Action";
import ActionController from "./action.controller";
import ActionRouter from "./action.router";

export default class ActionService extends BaseService<Action> {
  constructor(app: Application) {
    super("/action");
    this.registerRouter(
      new ActionRouter(this.registerController(new ActionController())),
      app
    );
  }
}
