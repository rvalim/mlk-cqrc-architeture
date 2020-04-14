import { Application } from "express";
import { AccessControl } from "role-acl";
import BaseService from "./baseService";
import UserService from "./User/user.service";
import RoleService from "./Role/role.service";
import ActionService from "./Action/action.service";
import ResourceService from "./Resource/resource.service";
import GrantService from "./Grant/grant.service";
import { IAccessControlGrant } from "./Grant/grant.interface";
import AccessService from "./Access/access.service";
import ChannelService from "./channelService";

export enum AppServices {
  User,
  Role,
  Action,
  Resource,
  Grant,
  Access,
  ChannelManager
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
  private _acl: AccessControl;

  constructor(app: Application) {
    this._services.set(AppServices.User, new UserService(app));
    this._services.set(AppServices.Role, new RoleService(app));
    this._services.set(AppServices.Action, new ActionService(app));
    this._services.set(AppServices.Resource, new ResourceService(app));
    this._services.set(AppServices.Grant, new GrantService(app));
    this._services.set(AppServices.Access, new AccessService(app));
    this._services.set(AppServices.ChannelManager, new ChannelService());

    this._acl = new AccessControl();
    this.setACL();
  }

  private async setACL() {
    const acl = await (this._services.get(AppServices.Grant) as GrantService).retrieveACL();
    this._acl.setGrants(acl);
  }

  public get(service: AppServices) {
    return this._services.get(service);
  }

  public get grants(): IAccessControlGrant[] {
    return this._acl.getGrants();
  }

  public get acl(): AccessControl {
    return this._acl;
  }
}
