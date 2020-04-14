import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import ResourceController from "./resource.controller";
import { Resource } from "../../models/Resource";

export default class ResourceRouter extends BaseRouter<Resource> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<ResourceController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new Resource
    this.router.post("/", this._controller.create);

    // Get all Resources
    this.router.get("/", this._controller.get);

    // Get by id Resource
    this.router.get("/:id", this._controller.getById);

    // Update a Resource
    this.router.put("/:id", this._controller.put);

    // Delete a Resource
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
