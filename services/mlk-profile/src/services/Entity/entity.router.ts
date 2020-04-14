import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Entity } from "../../models/Entity";
import EntityController from "./entity.controller";

export default class EntityRouter extends BaseRouter<Entity> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<EntityController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new entity
    this.router.post("/", this._controller.create);

    // Get all entity
    this.router.get("/", this._controller.get);

    // Get by id entity
    this.router.get("/:id", this._controller.getById);

    // Update a entity
    this.router.put("/:id", this._controller.put);

    // Delete a entity
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
