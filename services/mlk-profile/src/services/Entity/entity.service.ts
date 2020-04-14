import BaseService from "../baseService";
import { Application } from "express";
import { Entity } from "../../models/Entity";
import EntityController from "./entity.controller";
import EntityRouter from "./entity.router";

export default class EntityService extends BaseService<Entity> {
  constructor(app: Application) {
    super("/entity");
    this.registerRouter(
      new EntityRouter(this.registerController(new EntityController())),
      app
    );
  }
}
