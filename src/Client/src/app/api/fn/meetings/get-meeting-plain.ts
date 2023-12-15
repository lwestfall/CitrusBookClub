/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MeetingDto } from '../../models/meeting-dto';

export interface GetMeeting$Plain$Params {
  id: string;
}

export function getMeeting$Plain(http: HttpClient, rootUrl: string, params: GetMeeting$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
  const rb = new RequestBuilder(rootUrl, getMeeting$Plain.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MeetingDto>;
    })
  );
}

getMeeting$Plain.PATH = '/api/Meetings/{id}';
