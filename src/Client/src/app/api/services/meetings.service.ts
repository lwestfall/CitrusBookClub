/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createMeeting } from '../fn/meetings/create-meeting';
import { CreateMeeting$Params } from '../fn/meetings/create-meeting';
import { createMeeting$Plain } from '../fn/meetings/create-meeting-plain';
import { CreateMeeting$Plain$Params } from '../fn/meetings/create-meeting-plain';
import { getMeeting } from '../fn/meetings/get-meeting';
import { GetMeeting$Params } from '../fn/meetings/get-meeting';
import { getMeeting$Plain } from '../fn/meetings/get-meeting-plain';
import { GetMeeting$Plain$Params } from '../fn/meetings/get-meeting-plain';
import { getNextMeeting } from '../fn/meetings/get-next-meeting';
import { GetNextMeeting$Params } from '../fn/meetings/get-next-meeting';
import { getNextMeeting$Plain } from '../fn/meetings/get-next-meeting-plain';
import { GetNextMeeting$Plain$Params } from '../fn/meetings/get-next-meeting-plain';
import { MeetingDto } from '../models/meeting-dto';
import { MeetingSimpleDto } from '../models/meeting-simple-dto';
import { updateMeeting } from '../fn/meetings/update-meeting';
import { UpdateMeeting$Params } from '../fn/meetings/update-meeting';
import { updateMeeting$Plain } from '../fn/meetings/update-meeting-plain';
import { UpdateMeeting$Plain$Params } from '../fn/meetings/update-meeting-plain';

@Injectable({ providedIn: 'root' })
export class MeetingsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getNextMeeting()` */
  static readonly GetNextMeetingPath = '/api/Meetings/next';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNextMeeting$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNextMeeting$Plain$Response(params?: GetNextMeeting$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingSimpleDto>> {
    return getNextMeeting$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNextMeeting$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNextMeeting$Plain(params?: GetNextMeeting$Plain$Params, context?: HttpContext): Observable<MeetingSimpleDto> {
    return this.getNextMeeting$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<MeetingSimpleDto>): MeetingSimpleDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNextMeeting()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNextMeeting$Response(params?: GetNextMeeting$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingSimpleDto>> {
    return getNextMeeting(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNextMeeting$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNextMeeting(params?: GetNextMeeting$Params, context?: HttpContext): Observable<MeetingSimpleDto> {
    return this.getNextMeeting$Response(params, context).pipe(
      map((r: StrictHttpResponse<MeetingSimpleDto>): MeetingSimpleDto => r.body)
    );
  }

  /** Path part for operation `getMeeting()` */
  static readonly GetMeetingPath = '/api/Meetings/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMeeting$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMeeting$Plain$Response(params: GetMeeting$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
    return getMeeting$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMeeting$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMeeting$Plain(params: GetMeeting$Plain$Params, context?: HttpContext): Observable<MeetingDto> {
    return this.getMeeting$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<MeetingDto>): MeetingDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMeeting()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMeeting$Response(params: GetMeeting$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
    return getMeeting(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMeeting$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMeeting(params: GetMeeting$Params, context?: HttpContext): Observable<MeetingDto> {
    return this.getMeeting$Response(params, context).pipe(
      map((r: StrictHttpResponse<MeetingDto>): MeetingDto => r.body)
    );
  }

  /** Path part for operation `updateMeeting()` */
  static readonly UpdateMeetingPath = '/api/Meetings/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateMeeting$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateMeeting$Plain$Response(params: UpdateMeeting$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
    return updateMeeting$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateMeeting$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateMeeting$Plain(params: UpdateMeeting$Plain$Params, context?: HttpContext): Observable<MeetingDto> {
    return this.updateMeeting$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<MeetingDto>): MeetingDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateMeeting()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateMeeting$Response(params: UpdateMeeting$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
    return updateMeeting(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateMeeting$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateMeeting(params: UpdateMeeting$Params, context?: HttpContext): Observable<MeetingDto> {
    return this.updateMeeting$Response(params, context).pipe(
      map((r: StrictHttpResponse<MeetingDto>): MeetingDto => r.body)
    );
  }

  /** Path part for operation `createMeeting()` */
  static readonly CreateMeetingPath = '/api/Meetings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createMeeting$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  createMeeting$Plain$Response(params?: CreateMeeting$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
    return createMeeting$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createMeeting$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createMeeting$Plain(params?: CreateMeeting$Plain$Params, context?: HttpContext): Observable<MeetingDto> {
    return this.createMeeting$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<MeetingDto>): MeetingDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createMeeting()` instead.
   *
   * This method doesn't expect any request body.
   */
  createMeeting$Response(params?: CreateMeeting$Params, context?: HttpContext): Observable<StrictHttpResponse<MeetingDto>> {
    return createMeeting(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createMeeting$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createMeeting(params?: CreateMeeting$Params, context?: HttpContext): Observable<MeetingDto> {
    return this.createMeeting$Response(params, context).pipe(
      map((r: StrictHttpResponse<MeetingDto>): MeetingDto => r.body)
    );
  }

}
