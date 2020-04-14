import { Application } from "express";
import ProfileService from "./Profile/profile.service";
import ChannelService from "./channelService";
import ProjectTypeService from "./ProjectType/projectType.service";
import EntityTypeService from "./EntityType/entityType.service";
import EntityService from "./Entity/entity.service";
import ProjectService from "./Project/project.service";
import ProjectAllocService from "./ProjectAlloc/projectAlloc.service";

export enum AppServices {
  Profile,
  ProjectType,
  ChannelManager,
  EntityType,
  Entity,
  Project,
  ProjectAlloc
}

export default class ServiceManager {
  public static getInstance(app?: Application) {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager(app);
    }
    return ServiceManager.instance;
  }

  private static instance: ServiceManager;

  private readonly _services = new Map<AppServices, any>();

  constructor(app: Application) {
    this._services.set(AppServices.Profile, new ProfileService(app));
    this._services.set(AppServices.ProjectType, new ProjectTypeService(app));
    this._services.set(AppServices.Project, new ProjectService(app));
    this._services.set(AppServices.EntityType, new EntityTypeService(app));
    this._services.set(AppServices.Entity, new EntityService(app));
    this._services.set(AppServices.ProjectAlloc, new ProjectAllocService(app));
    this._services.set(AppServices.ChannelManager, new ChannelService());
  }

  public get(service: AppServices) {
    return this._services.get(service);
  }
}
