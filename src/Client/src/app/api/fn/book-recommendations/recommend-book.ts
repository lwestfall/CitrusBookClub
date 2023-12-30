/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookRecommendationDto } from '../../models/book-recommendation-dto';

export interface RecommendBook$Params {
  bookId: string;
  meetingId: string;
}

export function recommendBook(http: HttpClient, rootUrl: string, params: RecommendBook$Params, context?: HttpContext): Observable<StrictHttpResponse<BookRecommendationDto>> {
  const rb = new RequestBuilder(rootUrl, recommendBook.PATH, 'put');
  if (params) {
    rb.path('bookId', params.bookId, {"style":"simple"});
    rb.path('meetingId', params.meetingId, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookRecommendationDto>;
    })
  );
}

recommendBook.PATH = '/meeting/{meetingId}/book/{bookId}';
