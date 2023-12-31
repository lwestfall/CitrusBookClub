/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookRatingDto } from '../../models/book-rating-dto';

export interface GetBookRatings$Plain$Params {
  bookId: string;
}

export function getBookRatings$Plain(http: HttpClient, rootUrl: string, params: GetBookRatings$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRatingDto>>> {
  const rb = new RequestBuilder(rootUrl, getBookRatings$Plain.PATH, 'get');
  if (params) {
    rb.path('bookId', params.bookId, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookRatingDto>>;
    })
  );
}

getBookRatings$Plain.PATH = '/api/BookRatings/{bookId}/all';
