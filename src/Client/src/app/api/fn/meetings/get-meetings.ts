/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MeetingDto } from '../../models/meeting-dto';

export interface GetMeetings$Params {
}

export function getMeetings(http: HttpClient, rootUrl: string, params?: GetMeetings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MeetingDto>>> {
  const rb = new RequestBuilder(rootUrl, getMeetings.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<MeetingDto>>;
    })
  );
}

getMeetings.PATH = '/api/Meetings';
