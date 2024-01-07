/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MeetingDto } from '../../models/meeting-dto';

export interface UpdateMeeting$Plain$Params {
  meetingId: string;
  dateTime?: string;
}

export function updateMeeting$Plain(http: HttpClient, rootUrl: string, params: UpdateMeeting$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
  const rb = new RequestBuilder(rootUrl, updateMeeting$Plain.PATH, 'put');
  if (params) {
    rb.path('meetingId', params.meetingId, {"style":"simple"});
    rb.query('dateTime', params.dateTime, {"style":"form"});
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

updateMeeting$Plain.PATH = '/api/Meetings/{meetingId}';
