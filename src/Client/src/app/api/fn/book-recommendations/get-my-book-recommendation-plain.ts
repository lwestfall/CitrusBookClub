/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookRecommendationDto } from '../../models/book-recommendation-dto';

export interface GetMyBookRecommendation$Plain$Params {
  meetingId: string;
}

export function getMyBookRecommendation$Plain(http: HttpClient, rootUrl: string, params: GetMyBookRecommendation$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRecommendationDto>>> {
  const rb = new RequestBuilder(rootUrl, getMyBookRecommendation$Plain.PATH, 'get');
  if (params) {
    rb.path('meetingId', params.meetingId, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookRecommendationDto>>;
    })
  );
}

getMyBookRecommendation$Plain.PATH = '/api/BookRecommendations/meeting/{meetingId}/mine';
