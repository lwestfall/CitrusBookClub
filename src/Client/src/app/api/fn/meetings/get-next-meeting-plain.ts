/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MeetingSimpleDto } from '../../models/meeting-simple-dto';

export interface GetNextMeeting$Plain$Params {
}

export function getNextMeeting$Plain(http: HttpClient, rootUrl: string, params?: GetNextMeeting$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingSimpleDto>> {
  const rb = new RequestBuilder(rootUrl, getNextMeeting$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MeetingSimpleDto>;
    })
  );
}

getNextMeeting$Plain.PATH = '/api/Meetings/next';
