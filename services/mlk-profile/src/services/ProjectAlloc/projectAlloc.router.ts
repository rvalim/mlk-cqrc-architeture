import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { ProjectAlloc } from "../../models/ProjectAlloc";
import ProjectAllocController from "./projectAlloc.controller";

export default class ProjectAllocRouter extends BaseRouter<ProjectAlloc> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<ProjectAllocController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new project alloc
    this.router.post("/", this._controller.create);

    // Get all project alloc
    this.router.get("/", this._controller.get);

    // Get by id project alloc
    this.router.get("/:id", this._controller.getById);

    // Update a project alloc
    this.router.put("/:id", this._controller.put);

    // Delete a project alloc
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
