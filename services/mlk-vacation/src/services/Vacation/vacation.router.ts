import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Vacation } from "../../models/Vacation";
import VacationController from "./vacation.controller";

export default class TypeRouter extends BaseRouter<Vacation> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<VacationController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new Type
    this.router.post("/", this._controller.create);

    // Responsible for workflow update
    this.router.post("/workflow/approve", this._controller.approve);
    
    this.router.post("/workflow/reprove", this._controller.reprove);

    this.router.post("/workflow/cancel", this._controller.cancel);

    this.router.get("/byUserId/:userId/:from-:to", this._controller.getByRange);

    this.router.get("/usersByVacationId", this._controller.getUsersByVacationId);

    this.router.get("/mine/:from-:to", this._controller.getByToken);

    this.router.get("/all/:userId", this._controller.getAllByUserId);

    this.router.get("/:id", this._controller.getById);

    // // Delete a Types
    // this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
