/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { googleApiKey } from '../fn/misc/google-api-key';
import { GoogleApiKey$Params } from '../fn/misc/google-api-key';
import { googleApiKey$Plain } from '../fn/misc/google-api-key-plain';
import { GoogleApiKey$Plain$Params } from '../fn/misc/google-api-key-plain';

@Injectable({ providedIn: 'root' })
export class MiscService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `googleApiKey()` */
  static readonly GoogleApiKeyPath = '/api/GoogleApiKey';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `googleApiKey$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  googleApiKey$Plain$Response(params?: GoogleApiKey$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return googleApiKey$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `googleApiKey$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  googleApiKey$Plain(params?: GoogleApiKey$Plain$Params, context?: HttpContext): Observable<string> {
    return this.googleApiKey$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `googleApiKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  googleApiKey$Response(params?: GoogleApiKey$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return googleApiKey(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `googleApiKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  googleApiKey(params?: GoogleApiKey$Params, context?: HttpContext): Observable<string> {
    return this.googleApiKey$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
