import BaseService from "../baseService";
import { Application } from "express";
import { VacationConfig } from "../../models/VacationConfig";
import ConfigRouter from "./config.router";
import ConfigController from "./config.controller";

export default class ConfigService extends BaseService<VacationConfig> {
  constructor(app: Application) {
    super("/vacationconfig");
    this.registerRouter(
      new ConfigRouter(this.registerController(new ConfigController())),
      app
    );
  }
}
