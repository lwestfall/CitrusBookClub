/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { BookDto } from '../../models/book-dto';

export interface GetBook$Plain$Params {
  id: string;
}

export function getBook$Plain(http: HttpClient, rootUrl: string, params: GetBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
  const rb = new RequestBuilder(rootUrl, getBook$Plain.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookDto>;
    })
  );
}

getBook$Plain.PATH = '/api/Books/{id}';
