import BaseService from "../baseService";
import { Application } from "express";
import { ProjectAlloc } from "../../models/ProjectAlloc";
import ProjectAllocRouter from "./projectAlloc.router";
import ProjectAllocController from "./projectAlloc.controller";

export default class ProjectAllocService extends BaseService<ProjectAlloc> {
  constructor(app: Application) {
    super("/projectalloc");
    this.registerRouter(
      new ProjectAllocRouter(this.registerController(new ProjectAllocController())),
      app
    );
  }
}
