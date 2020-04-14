import BaseService from "../baseService";
import { Application } from "express";
import { VacationType } from "../../models/VacationType";
import TypeRouter from "./vacation.router";
import TypeController from "./vacation.controller";

export default class TypeService extends BaseService<VacationType> {
  constructor(app: Application) {
    super("/vacation");
    this.registerRouter(
      new TypeRouter(this.registerController(new TypeController())),
      app
    );
  }
}
