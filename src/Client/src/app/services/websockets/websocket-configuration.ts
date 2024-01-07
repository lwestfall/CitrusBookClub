import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketConfiguration {
  rootUrl: string = '';
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface WebsocketConfigurationParams {
  rootUrl?: string;
}
