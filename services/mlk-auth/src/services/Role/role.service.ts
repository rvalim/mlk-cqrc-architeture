import BaseService from "../baseService";
import { Application } from "express";
import { Role } from "../../models/Role";
import RoleRouter from "./role.router";
import RoleController from "./role.controller";

export default class RoleService extends BaseService<Role> {
  constructor(app: Application) {
    super("/role");
    this.registerRouter(
      new RoleRouter(this.registerController(new RoleController())),
      app
    );
  }
}
