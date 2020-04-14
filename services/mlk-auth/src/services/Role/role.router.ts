import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Role } from "../../models/Role";
import RoleController from "./role.controller";

export default class RoleRouter extends BaseRouter<Role> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<RoleController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new role
    this.router.post("/", this._controller.create);

    // Get all roles
    this.router.get("/", this._controller.get);

    // Get by id role
    this.router.get("/:id", this._controller.getById);

    // Update a role
    this.router.put("/:id", this._controller.put);

    // Delete a role
    this.router.delete("/:id", this._controller.delete);

    return this.router;
  }
}
