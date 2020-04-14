import BaseService from "../baseService";
import { Application } from "express";
import { VacationType } from "../../models/VacationType";
import StateRouter from "./state.router";
import StateController from "./state.controller";

export default class StateService extends BaseService<VacationType> {
  constructor(app: Application) {
    super("/vacationstate");
    this.registerRouter(
      new StateRouter(this.registerController(new StateController())),
      app
    );
  }
}
