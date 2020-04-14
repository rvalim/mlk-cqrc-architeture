import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Action } from "../../models/Action";
import ActionController from "./action.controller";

export default class ActionRouter extends BaseRouter<Action> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<ActionController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new Action
    this.router.post("/", this._controller.create);

    // Get all Actions
    this.router.get("/", this._controller.get);

    // Get by id Action
    this.router.get("/:id", this._controller.getById);

    // Update a Action
    this.router.put("/:id", this._controller.put);

    // Delete a Action
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
