/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BookRecommendationDto } from '../models/book-recommendation-dto';
import { getMyBookRecommendation } from '../fn/book-recommendations/get-my-book-recommendation';
import { GetMyBookRecommendation$Params } from '../fn/book-recommendations/get-my-book-recommendation';
import { getMyBookRecommendation$Plain } from '../fn/book-recommendations/get-my-book-recommendation-plain';
import { GetMyBookRecommendation$Plain$Params } from '../fn/book-recommendations/get-my-book-recommendation-plain';
import { recommendBook } from '../fn/book-recommendations/recommend-book';
import { RecommendBook$Params } from '../fn/book-recommendations/recommend-book';
import { recommendBook$Plain } from '../fn/book-recommendations/recommend-book-plain';
import { RecommendBook$Plain$Params } from '../fn/book-recommendations/recommend-book-plain';

@Injectable({ providedIn: 'root' })
export class BookRecommendationsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getMyBookRecommendation()` */
  static readonly GetMyBookRecommendationPath = '/api/BookRecommendations/meeting/{meetingId}/mine';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyBookRecommendation$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyBookRecommendation$Plain$Response(params: GetMyBookRecommendation$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRecommendationDto>>> {
    return getMyBookRecommendation$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyBookRecommendation$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyBookRecommendation$Plain(params: GetMyBookRecommendation$Plain$Params, context?: HttpContext): Observable<Array<BookRecommendationDto>> {
    return this.getMyBookRecommendation$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRecommendationDto>>): Array<BookRecommendationDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyBookRecommendation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyBookRecommendation$Response(params: GetMyBookRecommendation$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRecommendationDto>>> {
    return getMyBookRecommendation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyBookRecommendation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyBookRecommendation(params: GetMyBookRecommendation$Params, context?: HttpContext): Observable<Array<BookRecommendationDto>> {
    return this.getMyBookRecommendation$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRecommendationDto>>): Array<BookRecommendationDto> => r.body)
    );
  }

  /** Path part for operation `recommendBook()` */
  static readonly RecommendBookPath = '/meeting/{meetingId}/book/{bookId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recommendBook$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  recommendBook$Plain$Response(params: RecommendBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookRecommendationDto>> {
    return recommendBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recommendBook$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recommendBook$Plain(params: RecommendBook$Plain$Params, context?: HttpContext): Observable<BookRecommendationDto> {
    return this.recommendBook$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookRecommendationDto>): BookRecommendationDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recommendBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  recommendBook$Response(params: RecommendBook$Params, context?: HttpContext): Observable<StrictHttpResponse<BookRecommendationDto>> {
    return recommendBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recommendBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recommendBook(params: RecommendBook$Params, context?: HttpContext): Observable<BookRecommendationDto> {
    return this.recommendBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookRecommendationDto>): BookRecommendationDto => r.body)
    );
  }

}
