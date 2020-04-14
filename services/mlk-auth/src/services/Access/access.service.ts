import BaseService from "../baseService";
import { Application } from "express";
import AccessController from "./access.controller";
import AccessRouter from "./access.router";
import { Access } from "role-acl";

export default class AccessService extends BaseService<Access> {
  constructor(app: Application) {
    super("/access");
    this.registerRouter(
      new AccessRouter(this.registerController(new AccessController())),
      app
    );
  }
}
