import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Grant } from "../../models/Grant";
import GrantController from "./grant.controller";

export default class GrantRouter extends BaseRouter<Grant> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<GrantController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new Grant
    this.router.post("/", this._controller.create);

    // Get all Grants
    this.router.get("/", this._controller.get);

    // Get by id Grant
    this.router.get("/:id", this._controller.getById);

    // Update a Grant
    this.router.put("/:id", this._controller.put);

    // Delete a Grant
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
