import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Project } from "../../models/Project";
import ProjectController from "./project.controller";

export default class ProjectRouter extends BaseRouter<Project> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<ProjectController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new Project
    this.router.post("/", this._controller.create);

    // Get all Projects
    this.router.get("/", this._controller.get);

    // Get by id Projects
    this.router.get("/:id", this._controller.getById);

    // Update a Project
    this.router.put("/:id", this._controller.put);

    // Delete a Project
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
