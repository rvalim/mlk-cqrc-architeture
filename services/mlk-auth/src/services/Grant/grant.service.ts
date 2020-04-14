import BaseService from "../baseService";
import { Application } from "express";
import GrantRouter from "./grant.router";
import GrantController from "./grant.controller";
import { Grant } from "../../models/Grant";
import { IAccessControlGrant } from "./grant.interface";

export default class GrantService extends BaseService<Grant> {
  constructor(app: Application) {
    super("/grant");
    this.registerRouter(
      new GrantRouter(this.registerController(new GrantController())),
      app
    );
  }

  public async retrieveACL() {
    return (this.controller as GrantController).retrieveACL();
  }
}
