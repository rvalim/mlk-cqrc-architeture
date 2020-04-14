import BaseService from "../baseService";
import { Application } from "express";
import { TimesheetEntry } from "../../models/TimesheetEntry";
import TimesheetEntryRouter from "./timesheetEntry.router";
import TimesheetEntryController from "./timesheetEntry.controller";

export default class TimesheetEntryService extends BaseService<TimesheetEntry> {
  constructor(app: Application) {
    super("/timesheetentry");
    this.registerRouter(
      new TimesheetEntryRouter(this.registerController(new TimesheetEntryController())),
      app
    );
  }
}
