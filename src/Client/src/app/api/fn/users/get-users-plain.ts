/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { UserDto } from '../../models/user-dto';

export interface GetUsers$Plain$Params {
}

export function getUsers$Plain(http: HttpClient, rootUrl: string, params?: GetUsers$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDto>>> {
  const rb = new RequestBuilder(rootUrl, getUsers$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserDto>>;
    })
  );
}

getUsers$Plain.PATH = '/api/Users';
