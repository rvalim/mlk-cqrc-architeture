import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { UserAcc } from "../../models/UserAcc";
import UserController from "./user.controller";

export default class UserRouter extends BaseRouter<UserAcc> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<UserController>
  ) {
    super(_controller);
    this.router = express.Router();
  }

  public registerRoutes(): Router {
    // Create a new account
    this.router.post("/register", this._controller.create);

    // Checks if a token is valid
    this.router.get("/validate", this._controller.validate);

    // Generate a new token
    this.router.get("/login", this._controller.login);

    // dunno about this yet
    // this.router.post("/logout", this._controller.logout);

    // Refresh token lifetime
    this.router.get("/refresh", this._controller.refresh);

    // Toggle account as deleted
    // this.router.delete("/delete", this._controller.delete);

    // Toggle account as active
    // this.router.post("/delete", this._controller.delete);

    // Blacklist a token
    // this.router.post("/blacklist", this._controller.delete);

    // Unblacklist a token
    // this.router.post("/unblacklist", this._controller.delete);

    // Reset password
    this.router.get("/reset", this._controller.reset);

    // Get all accounts
    this.router.get("/:id", this._controller.getById);

    // Get all accounts
    this.router.get("/", this._controller.get);

    return this.router;
  }
}
