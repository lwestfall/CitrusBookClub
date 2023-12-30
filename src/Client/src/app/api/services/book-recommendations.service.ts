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
import { getMyBookRecommendations } from '../fn/book-recommendations/get-my-book-recommendations';
import { GetMyBookRecommendations$Params } from '../fn/book-recommendations/get-my-book-recommendations';
import { getMyBookRecommendations$Plain } from '../fn/book-recommendations/get-my-book-recommendations-plain';
import { GetMyBookRecommendations$Plain$Params } from '../fn/book-recommendations/get-my-book-recommendations-plain';
import { recommendBook } from '../fn/book-recommendations/recommend-book';
import { RecommendBook$Params } from '../fn/book-recommendations/recommend-book';
import { recommendBook$Plain } from '../fn/book-recommendations/recommend-book-plain';
import { RecommendBook$Plain$Params } from '../fn/book-recommendations/recommend-book-plain';

@Injectable({ providedIn: 'root' })
export class BookRecommendationsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getMyBookRecommendations()` */
  static readonly GetMyBookRecommendationsPath = '/api/BookRecommendations/mine';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyBookRecommendations$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyBookRecommendations$Plain$Response(params?: GetMyBookRecommendations$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRecommendationDto>>> {
    return getMyBookRecommendations$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyBookRecommendations$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyBookRecommendations$Plain(params?: GetMyBookRecommendations$Plain$Params, context?: HttpContext): Observable<Array<BookRecommendationDto>> {
    return this.getMyBookRecommendations$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRecommendationDto>>): Array<BookRecommendationDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyBookRecommendations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyBookRecommendations$Response(params?: GetMyBookRecommendations$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRecommendationDto>>> {
    return getMyBookRecommendations(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyBookRecommendations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyBookRecommendations(params?: GetMyBookRecommendations$Params, context?: HttpContext): Observable<Array<BookRecommendationDto>> {
    return this.getMyBookRecommendations$Response(params, context).pipe(
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
