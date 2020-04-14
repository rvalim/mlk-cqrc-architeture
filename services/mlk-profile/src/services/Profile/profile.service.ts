import BaseService from "../baseService";
import { Application } from "express";
import { Profile } from "../../models/Profile";
import ProfileController from "./profile.controller";
import ProfileRouter from "./profile.router";

export default class ProfileService extends BaseService<Profile> {
  constructor(app: Application) {
    super("/profile");
    this.registerRouter(
      new ProfileRouter(this.registerController(new ProfileController())),
      app
    );
  }
}
