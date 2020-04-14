import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { VacationType } from "../../models/VacationType";
import TypeController from "./type.controller";

export default class TypeRouter extends BaseRouter<VacationType> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<TypeController>
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
