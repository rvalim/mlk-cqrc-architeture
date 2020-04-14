import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { TimesheetConfig } from "../../models/TimesheetConfig";
import TimesheetConfigController from "./timesheetConfig.controller";

export default class TimesheetConfigRouter extends BaseRouter<TimesheetConfig> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<TimesheetConfigController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Get all TimesheetConfig
    this.router.get("/", this._controller.get);

    // Get one TimesheetConfig
    this.router.get("/:id", this._controller.getById);

    // Update a TimesheetConfig
    this.router.put("/:id", this._controller.put);

    return this.router;
  }
}
