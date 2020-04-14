import BaseService from "../baseService";
import { Application } from "express";
import { Resource } from "../../models/Resource";
import ResourceRouter from "./resource.router";
import ResourceController from "./resource.controller";

export default class ResourceService extends BaseService<Resource> {
  constructor(app: Application) {
    super("/resource");
    this.registerRouter(
      new ResourceRouter(this.registerController(new ResourceController())),
      app
    );
  }
}
