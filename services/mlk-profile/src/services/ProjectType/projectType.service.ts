import BaseService from "../baseService";
import { Application } from "express";
import ProjectTypeRouter from "./projectType.router";
import ProjectTypeController from "./projectType.controller";
import { ProjectType } from "../../models/ProjectType";

export default class ProjectTypeService extends BaseService<ProjectType> {
  constructor(app: Application) {
    super("/projecttype");
    this.registerRouter(
      new ProjectTypeRouter(this.registerController(new ProjectTypeController())),
      app
    );
  }
}
