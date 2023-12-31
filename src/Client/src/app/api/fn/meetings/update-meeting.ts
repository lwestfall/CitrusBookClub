/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MeetingDto } from '../../models/meeting-dto';

export interface UpdateMeeting$Params {
  meetingId: string;
  dateTime?: string;
}

export function updateMeeting(http: HttpClient, rootUrl: string, params: UpdateMeeting$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
  const rb = new RequestBuilder(rootUrl, updateMeeting.PATH, 'put');
  if (params) {
    rb.path('meetingId', params.meetingId, {"style":"simple"});
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

updateMeeting.PATH = '/api/Meetings/{meetingId}';
