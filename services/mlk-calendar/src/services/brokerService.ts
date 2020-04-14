import ChannelService from "./channelService";

export class Broker {
  constructor(private readonly channelMgr: ChannelService) {
    this.init();
  }

  private init() {
    console.info("No channels to listen to yet");
  }

  private handleMessage(chan) {
    if (process.env["APP_ENV"] === "dev") {
      chan.rx.on("message", (channelID, payload) => {
        console.log(`\nBroker ${channelID}\n ${payload}\n`);
      });
    }
  }
}
