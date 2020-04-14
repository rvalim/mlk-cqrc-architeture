import BaseService from "../baseService";
import { Application } from "express";
import { TimesheetConfig } from "../../models/TimesheetConfig";
import TimesheetConfigRouter from "./timesheetConfig.router";
import TimesheetConfigController from "./timesheetConfig.controller";

export default class TimesheetConfigService extends BaseService<TimesheetConfig> {
  constructor(app: Application) {
    super("/timesheetconfig");
    this.registerRouter(
      new TimesheetConfigRouter(this.registerController(new TimesheetConfigController())),
      app
    );
  }
}
