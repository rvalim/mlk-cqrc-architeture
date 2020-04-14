import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { VacationConfig } from "../../models/VacationConfig";
import ConfigController from "./config.controller";

export default class ConfigRouter extends BaseRouter<VacationConfig> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<ConfigController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new Type
    this.router.post("/", this._controller.create);

    // Get all Types
    this.router.get("/", this._controller.get);

    // Get by id Types
    this.router.get("/:id", this._controller.getById);

    // Update a Types
    this.router.put("/:id", this._controller.put);

    // Delete a Types
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
