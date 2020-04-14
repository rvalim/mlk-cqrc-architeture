import BaseService from "../baseService";
import { Application } from "express";
import BullRouter from "./router";
import BullController from "./controller";
import { Bull } from "../../models/Bull";

export default class HandlerBullService extends BaseService<Bull> {
  constructor(app: Application) {
    super("/bull");
    this.registerRouter(
      new BullRouter(this.registerController(new BullController())),
      app
    );
  }
}
