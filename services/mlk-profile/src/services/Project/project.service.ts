import BaseService from "../baseService";
import { Application } from "express";
import { Project } from "../../models/Project";
import ProjectController from "./project.controller";
import ProjectRouter from "./project.router";

export default class ProjectService extends BaseService<Project> {
  constructor(app: Application) {
    super("/project");
    this.registerRouter(
      new ProjectRouter(this.registerController(new ProjectController())),
      app
    );
  }
}
