import BaseService from "../baseService";
import { Application } from "express";
import { UserAcc } from "../../models/UserAcc";
import UserController from "./user.controller";
import UserRouter from "./user.router";

export default class UserService extends BaseService<UserAcc> {
  constructor(app: Application) {
    super("/auth");
    this.registerRouter(
      new UserRouter(this.registerController(new UserController())),
      app
    );
  }
}
