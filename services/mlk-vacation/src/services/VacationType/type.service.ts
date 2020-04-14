import BaseService from "../baseService";
import { Application } from "express";
import { VacationType } from "../../models/VacationType";
import TypeRouter from "./type.router";
import TypeController from "./type.controller";

export default class TypeService extends BaseService<VacationType> {
  constructor(app: Application) {
    super("/vacationtype");
    this.registerRouter(
      new TypeRouter(this.registerController(new TypeController())),
      app
    );
  }
}
