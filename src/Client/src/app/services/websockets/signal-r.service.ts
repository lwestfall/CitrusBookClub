import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { WebsocketConfiguration } from './websocket-configuration';

@Injectable()
export abstract class SignalRService {
  connection: HubConnection;

  constructor(config: WebsocketConfiguration, hubRoute: string) {
    const url = new URL(`hubs/${hubRoute}`, config.rootUrl);

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url.toString(), {
        accessTokenFactory: () => {
          return localStorage.getItem('id_token') ?? '';
        },
      })
      .build();
  }

  async start(): Promise<void> {
    await this.connection.start();
  }

  async stop(): Promise<void> {
    await this.connection.stop();
  }
}
