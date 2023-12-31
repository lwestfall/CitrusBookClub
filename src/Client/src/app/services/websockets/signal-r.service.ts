import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { WebsocketConfiguration } from './websocket-configuration';

@Injectable()
export abstract class SignalRService {
  connection: HubConnection;
  connected$: Subject<boolean> = new Subject<boolean>();

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

  async start(): Promise<void> {
    await this.connection.start();
    this.connected$.next(true);
  }

  async stop(): Promise<void> {
    await this.connection.stop();
  }
}
