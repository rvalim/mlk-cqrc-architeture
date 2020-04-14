import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { TimesheetEntry } from "../../models/TimesheetEntry";
import TimesheetEntryController from "./timesheetEntry.controller";

export default class TimesheetEntryRouter extends BaseRouter<TimesheetEntry> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<TimesheetEntryController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new TimesheetEntry
    this.router.post("/", this._controller.create);

    // Transitions in state
    this.router.post("/transition/:id", this._controller.transition);

    // Get all owned timesheets
    this.router.get("/owner", this._controller.owned);

    // Get owned timesheets by id
    this.router.get("/owner/:id", this._controller.ownedById);

    // Get all TimesheetEntry
    this.router.get("/", this._controller.get);

    // Get by id TimesheetEntry
    this.router.get("/:id", this._controller.getById);

    // Update a TimesheetEntry
    this.router.put("/:id", this._controller.put);

    // Delete a TimesheetEntry
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
