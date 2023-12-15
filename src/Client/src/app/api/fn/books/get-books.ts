/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookDto } from '../../models/book-dto';

export interface GetBooks$Params {
}

export function getBooks(http: HttpClient, rootUrl: string, params?: GetBooks$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookDto>>> {
  const rb = new RequestBuilder(rootUrl, getBooks.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookDto>>;
    })
  );
}

getBooks.PATH = '/api/Books';
