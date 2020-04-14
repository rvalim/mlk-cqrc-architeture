import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Bull } from "../../models/Bull";
import BullController from "./controller";

export default class BullRouter extends BaseRouter<Bull> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<BullController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Get bull by id
    this.router.get("/:jobId", this._controller.getById);

    // Create a new Bull
    this.router.put("/update", this._controller.put);

    // // Update a Bulls
    // this.router.delete("/:id", this._controller.delete);

    // Update a Bulls
    this.router.post("/", this._controller.create);
    
    // Update a Bulls
    // this.router.get("/", this._controller.get);

    return this.router;
  }
}
