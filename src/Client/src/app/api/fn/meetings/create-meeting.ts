/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MeetingDto } from '../../models/meeting-dto';

export interface CreateMeeting$Params {
  dateTime?: string;
}

export function createMeeting(http: HttpClient, rootUrl: string, params?: CreateMeeting$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
  const rb = new RequestBuilder(rootUrl, createMeeting.PATH, 'post');
  if (params) {
    rb.query('dateTime', params.dateTime, {"style":"form"});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MeetingDto>;
    })
  );
}

createMeeting.PATH = '/api/Meetings';
