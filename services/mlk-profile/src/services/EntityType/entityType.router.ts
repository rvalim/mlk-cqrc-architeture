import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import EntityTypeController from "./entityType.controller";
import { EntityType } from "../../models/EntityType";

export default class EntityTypeRouter extends BaseRouter<EntityType> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<EntityTypeController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new entity type
    this.router.post("/", this._controller.create);

    // Get all entity type
    this.router.get("/", this._controller.get);

    // Get by id entity type
    this.router.get("/:id", this._controller.getById);

    // Update a entity type
    this.router.put("/:id", this._controller.put);

    // Delete a entity type
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
