import Redis from "ioredis";
import { throwError } from "../utils/Error";
import { tryStringify } from "../utils/general";
import { Broker } from "./brokerService";

export enum ChannelID {
  UserCreateAccount = "[User]_create_account"
}

export interface IRedisConfig {
  port: number;
  host: string;
}

export interface IChannel {
  config: IRedisConfig;
  tx: Redis;
  rx: Redis;
}

export default class ChannelService {
  private readonly config = {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_URL,
    // password: 'auth',
  };

  private channels: Map<ChannelID, IChannel>;
  private tx: Redis;
  private broker: Broker;

  constructor() {
    try {
      this.channels = new Map();
      this.broker = new Broker(this);
    } catch (e) {
      throwError(e);
    }
  }

  public closeChannel(id: ChannelID) {
    const channel = this.channels.get(id);
    if (channel && channel.rx) {
      channel.rx.disconnect();
    }
    this.channels.delete(id);
    if (this.channels.size === 0) {
      channel.tx.disconnect();
      this.tx = undefined;
    }
  }

  public closeAllChannels(): void {
    for (const [id] of this.channels) {
      this.closeChannel(id);
    }
    if (this.tx) {
      this.tx.disconnect();
      this.tx = undefined;
    }
  }

  public getOpenChannels(): Array<[ChannelID, IChannel]> {
    return [...this.channels];
  }

  public getChannel(id: ChannelID) {
    return this.channels.get(id);
  }

  public createChannel(
    id: ChannelID,
    config: IRedisConfig = this.config,
    pubsub: boolean = true,
  ): IChannel {
    let descriptor: IChannel;

    const d: IChannel = this.channels.get(id);

    if (d) {
      descriptor = d;
    } else {
      if (!this.tx) {
        this.tx = new Redis(config);
      }
      let rx: Redis;
      if (pubsub) {
        rx = new Redis(config);
      }
      descriptor = {
        config,
        tx: this.tx,
        rx,
      };

      this.channels.set(id, descriptor);
    }

    return descriptor;
  }

  public sendMessage(_payload: object, chan: IChannel, id: ChannelID) {
    const payload = tryStringify(_payload);
    return chan.tx.publish(id, payload);
  }
}
