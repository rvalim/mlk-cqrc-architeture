import ChannelService, { ChannelID } from "./channelService";
import { tryParse } from "../utils/general";
import ServiceManager, { AppServices } from "./serviceManager";
import ProfileService from "./Profile/profile.service";

export class Broker {
  constructor(private readonly channelMgr: ChannelService) {
    this.init();
  }

  private init() {
    this.handleUserCreate();
  }

  private handleMessage(chan) {
    if (process.env["APP_ENV"] === "dev") {
      chan.rx.on("message", (channelID, payload) => {
        console.log(`\nBroker ${channelID}\n ${payload}\n`);
      });
    }
  }

  private handleUserCreate() {
    const chan = this.channelMgr.createChannel(ChannelID.UserCreateAccount);
    this.handleMessage(chan);
    chan.rx.on("message", (channelID, _payload) => {
      if (channelID === ChannelID.UserCreateAccount) {
        const payload = tryParse(_payload);
        const profileService: ProfileService = ServiceManager.getInstance().get(AppServices.Profile);
        profileService.controller.createFromBroker({userId: payload.user.id.toString()});
      }
    });
    chan.rx.subscribe(ChannelID.UserCreateAccount);
  }
}
