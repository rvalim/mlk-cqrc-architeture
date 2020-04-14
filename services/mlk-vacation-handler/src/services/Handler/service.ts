import BaseService from "../baseService";
import { Application } from "express";
import VacationRouter from "./router";
import VacationController from "./controller";
import { Vacation } from "../../models/Vacation";

export default class HandlerVacationService extends BaseService<Vacation> {
  constructor(app: Application) {
    super("/vacation");
    this.registerRouter(
      new VacationRouter(this.registerController(new VacationController())),
      app
    );
  }
}
