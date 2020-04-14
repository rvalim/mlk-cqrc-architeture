import { Router } from "express";
import express = require("express");
import BaseRouter from "../baseRouter";
import { Profile } from "../../models/Profile";
import ProfileController from "./profile.controller";

export default class ProfileRouter extends BaseRouter<Profile> {
  public router: Router;

  constructor(
    protected readonly _controller: Partial<ProfileController>
  ) {
    super(_controller);
    this.router = express.Router(); 
  }

  public registerRoutes(): Router {
    // Get all PROFILE
    this.router.get("/", this._controller.get);

    // Get PROFILE by token
    this.router.get("/myteam", this._controller.getMyTeam);

    // Get my PROFILE 
    this.router.get("/mine", this._controller.getByToken);

    // Get PROFILE by profileId
    this.router.get("/user/:id", this._controller.getByUserId);

    // Get PROFILE by userId
    this.router.get("/:id", this._controller.getById);

    // Update a PROFILE
    this.router.put("/:id", this._controller.put);

    return this.router;
  }
}
