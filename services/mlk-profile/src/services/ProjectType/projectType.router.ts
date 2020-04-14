import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { ProjectType } from "../../models/ProjectType";
import ProjectTypeController from "./projectType.controller";

export default class ProjectTypeRouter extends BaseRouter<ProjectType> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<ProjectTypeController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new project type
    this.router.post("/", this._controller.create);

    // Get all project type
    this.router.get("/", this._controller.get);

    // Get by id project type
    this.router.get("/:id", this._controller.getById);

    // Update a project type
    this.router.put("/:id", this._controller.put);

    // Delete a project type
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
