import BaseService from "../baseService";
import { Application } from "express";
import { TimesheetState } from "../../models/TimesheetState";
import TimesheetStateRouter from "./timesheetState.router";
import TimesheetStateController from "./timesheetState.controller";

export default class TimesheetStateService extends BaseService<TimesheetState> {
  constructor(app: Application) {
    super("/timesheetstate");
    this.registerRouter(
      new TimesheetStateRouter(this.registerController(new TimesheetStateController())),
      app
    );
  }
}
