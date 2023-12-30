/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookAnonymousDto } from '../../models/book-anonymous-dto';

export interface GetOthersBooks$Params {
}

export function getOthersBooks(http: HttpClient, rootUrl: string, params?: GetOthersBooks$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookAnonymousDto>>> {
  const rb = new RequestBuilder(rootUrl, getOthersBooks.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookAnonymousDto>>;
    })
  );
}

getOthersBooks.PATH = '/api/Books/others';
