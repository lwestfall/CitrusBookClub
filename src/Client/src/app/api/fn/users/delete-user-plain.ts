/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserDto } from '../../models/user-dto';

export interface DeleteUser$Plain$Params {
  b64Email: string;
}

export function deleteUser$Plain(http: HttpClient, rootUrl: string, params: DeleteUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
  const rb = new RequestBuilder(rootUrl, deleteUser$Plain.PATH, 'delete');
  if (params) {
    rb.path('b64Email', params.b64Email, {"style":"simple"});
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

deleteUser$Plain.PATH = '/api/Users/{b64Email}';
