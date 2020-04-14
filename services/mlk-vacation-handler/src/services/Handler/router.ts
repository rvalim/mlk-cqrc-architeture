import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Vacation } from "../../models/Vacation";
import VacationController from "./controller";

export default class VacationRouter extends BaseRouter<Vacation> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<VacationController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new Vacation
    this.router.post("/create", this._controller.create);

    // Update a Vacations
    this.router.post("/approve", this._controller.approve);

    // Update a Vacations
    this.router.post("/reprove", this._controller.reprove);

    // Update a Vacations
    this.router.post("/cancel", this._controller.cancel);

    return this.router;
  }
}
