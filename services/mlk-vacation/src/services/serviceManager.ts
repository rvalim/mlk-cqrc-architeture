import { Application } from "express";
import ChannelService from "./channelService";
import VacationService from "./Vacation/vacation.service";
import VacationConfigService from "./VacationConfig/config.service";
import VacationStateService from "./VacationState/state.service";
import VacationTypeService from "./VacationType/type.service";

export enum AppServices {
  VacationService,
  VacationConfigService,
  VacationStateService,
  VacationTypeService,
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

  constructor(app: Application) {
    this._services.set(AppServices.VacationService, new VacationService(app));
    this._services.set(AppServices.VacationConfigService, new VacationConfigService(app));
    this._services.set(AppServices.VacationStateService, new VacationStateService(app));
    this._services.set(AppServices.VacationTypeService, new VacationTypeService(app));
    this._services.set(AppServices.ChannelManager, new ChannelService());
  }

  public get(service: AppServices) {
    return this._services.get(service);
  }
}
