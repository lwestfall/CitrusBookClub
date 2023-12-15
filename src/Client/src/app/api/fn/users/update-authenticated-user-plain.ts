/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateUserDto } from '../../models/update-user-dto';
import { UserDto } from '../../models/user-dto';

export interface UpdateAuthenticatedUser$Plain$Params {
      body?: UpdateUserDto
}

export function updateAuthenticatedUser$Plain(http: HttpClient, rootUrl: string, params?: UpdateAuthenticatedUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
  const rb = new RequestBuilder(rootUrl, updateAuthenticatedUser$Plain.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserDto>;
    })
  );
}

updateAuthenticatedUser$Plain.PATH = '/me';
