import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import AccessController from "./access.controller";
import { Access } from "role-acl";

export default class AccessRouter extends BaseRouter<Access> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<AccessController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Get all
    this.router.get('/all', this._controller.get)
    
    // Checks access to a resource
    this.router.get("/", this._controller.check);

    // Get by id
    this.router.get('/:id', this._controller.getById)

    // Create access
    this.router.post('/', this._controller.create)

    // Update access
    this.router.put('/:id', this._controller.put)

    // Delete access
    this.router.delete('/:id', this._controller.delete)

    return this.router;
  }
}
