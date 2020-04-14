import BaseService from "../baseService";
import { Application } from "express";
import { Holiday } from "../../models/Holiday";
import HolidayRouter from "./holiday.router";
import HolidayController from "./holiday.controller";

export default class HolidayService extends BaseService<Holiday> {
  constructor(app: Application) {
    super("/calendar");
    this.registerRouter(
      new HolidayRouter(this.registerController(new HolidayController())),
      app
    );
  }
}
