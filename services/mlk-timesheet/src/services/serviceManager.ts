import { Application } from "express";
import ChannelService from "./channelService";
import TimesheetStateService from "./TimesheetState/timesheetState.service";
import TimesheetEntryService from "./TimesheetEntry/timesheetEntry.service";
import TimesheetConfigService from "./TimesheetConfig/timesheetConfig.service";

export enum AppServices {
  TimesheetState,
  TimesheetEntry,
  TimesheetConfig,
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
    this._services.set(AppServices.TimesheetState, new TimesheetStateService(app));
    this._services.set(AppServices.TimesheetConfig, new TimesheetConfigService(app));
    this._services.set(AppServices.TimesheetEntry, new TimesheetEntryService(app));
    this._services.set(AppServices.ChannelManager, new ChannelService());
  }

  public get(service: AppServices) {
    return this._services.get(service);
  }
}
