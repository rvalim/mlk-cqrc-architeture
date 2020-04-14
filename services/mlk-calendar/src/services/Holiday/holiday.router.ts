import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Holiday } from "../../models/Holiday";
import HolidayController from "./holiday.controller";

export default class HolidayRouter extends BaseRouter<Holiday> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<HolidayController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new holiday
    this.router.post("/", this._controller.create);

    // Get by Range holidays
    this.router.get("/range", this._controller.getByRange);

    // Get by date holidays
    this.router.get("/date", this._controller.getByDate);

    // Get all holidays
    this.router.get("/", this._controller.get);

    // Get by id holidays
    this.router.get("/:id", this._controller.getById);

    // Update a holidays
    this.router.put("/:id", this._controller.put);

    // Delete a holidays
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
