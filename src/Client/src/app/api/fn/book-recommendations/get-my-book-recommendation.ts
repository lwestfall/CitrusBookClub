/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookRecommendationDto } from '../../models/book-recommendation-dto';

export interface GetMyBookRecommendation$Params {
  meetingId: string;
}

export function getMyBookRecommendation(http: HttpClient, rootUrl: string, params: GetMyBookRecommendation$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRecommendationDto>>> {
  const rb = new RequestBuilder(rootUrl, getMyBookRecommendation.PATH, 'get');
  if (params) {
    rb.path('meetingId', params.meetingId, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookRecommendationDto>>;
    })
  );
}

getMyBookRecommendation.PATH = '/api/BookRecommendations/meeting/{meetingId}/mine';
