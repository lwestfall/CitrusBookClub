/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookRatingDto } from '../../models/book-rating-dto';

export interface RateBook$Plain$Params {
      body?: BookRatingDto
}

export function rateBook$Plain(http: HttpClient, rootUrl: string, params?: RateBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookRatingDto>> {
  const rb = new RequestBuilder(rootUrl, rateBook$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookRatingDto>;
    })
  );
}

rateBook$Plain.PATH = '/api/BookRatings';
