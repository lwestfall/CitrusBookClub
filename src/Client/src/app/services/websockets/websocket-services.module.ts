import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  WebsocketConfiguration,
  WebsocketConfigurationParams,
} from './websocket-configuration';

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class WebsocketServicesModule {
  static forRoot(
    params: WebsocketConfigurationParams
  ): ModuleWithProviders<WebsocketServicesModule> {
    return {
      ngModule: WebsocketServicesModule,
      providers: [
        {
          provide: WebsocketConfiguration,
          useValue: params,
        },
      ],
    };
  }
}
