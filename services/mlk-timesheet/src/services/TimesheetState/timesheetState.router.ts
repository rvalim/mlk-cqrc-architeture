import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { TimesheetState } from "../../models/TimesheetState";
import TimesheetStateController from "./timesheetState.controller";

export default class TimesheetStateRouter extends BaseRouter<TimesheetState> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<TimesheetStateController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new TimesheetState
    this.router.post("/", this._controller.create);

    // Get all TimesheetState
    this.router.get("/", this._controller.get);

    // Get by id TimesheetState
    this.router.get("/:id", this._controller.getById);

    // Update a TimesheetState
    this.router.put("/:id", this._controller.put);

    // Delete a TimesheetState
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
