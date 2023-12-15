/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookDto } from '../../models/book-dto';

export interface GetBooks$Plain$Params {
}

export function getBooks$Plain(http: HttpClient, rootUrl: string, params?: GetBooks$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookDto>>> {
  const rb = new RequestBuilder(rootUrl, getBooks$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookDto>>;
    })
  );
}

getBooks$Plain.PATH = '/api/Books';
