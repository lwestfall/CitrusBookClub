import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { WebsocketConfiguration } from './websocket-configuration';

@Injectable()
export abstract class SignalRService {
  connection: HubConnection;

  constructor(config: WebsocketConfiguration, hubRoute: string) {
    const url = new URL(`hubs/${hubRoute}`, config.rootUrl);

    this.connection = new HubConnectionBuilder()
      .withUrl(url.toString(), {
        accessTokenFactory: () => {
          return localStorage.getItem('id_token') ?? '';
        },
      })
      .build();
  }

  get connected(): boolean {
    return this.connection.state === HubConnectionState.Connected;
  }

  async start(): Promise<void> {
    switch (this.connection.state) {
      case HubConnectionState.Connected:
      case HubConnectionState.Connecting:
      case HubConnectionState.Reconnecting:
        return;
    }

    return this.connection.start();
  }

  async stop(): Promise<void> {
    await this.connection.stop();
  }
}
