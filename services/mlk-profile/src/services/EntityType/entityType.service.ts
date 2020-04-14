import BaseService from "../baseService";
import { Application } from "express";
import EntityTypeRouter from "./entityType.router";
import EntityTypeController from "./entityType.controller";
import { EntityType } from "../../models/EntityType";

export default class EntityTypeService extends BaseService<EntityType> {
  constructor(app: Application) {
    super("/entitytype");
    this.registerRouter(
      new EntityTypeRouter(this.registerController(new EntityTypeController())),
      app
    );
  }
}
