/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getBookRatings } from '../fn/book-ratings/get-book-ratings';
import { GetBookRatings$Params } from '../fn/book-ratings/get-book-ratings';
import { getBookRatings$Plain } from '../fn/book-ratings/get-book-ratings-plain';
import { GetBookRatings$Plain$Params } from '../fn/book-ratings/get-book-ratings-plain';
import { rateBook } from '../fn/book-ratings/rate-book';
import { RateBook$Params } from '../fn/book-ratings/rate-book';
import { rateBook$Plain } from '../fn/book-ratings/rate-book-plain';
import { RateBook$Plain$Params } from '../fn/book-ratings/rate-book-plain';
import { RatingDto } from '../models/rating-dto';

@Injectable({ providedIn: 'root' })
export class BookRatingsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `rateBook()` */
  static readonly RateBookPath = '/api/BookRatings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rateBook$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  rateBook$Plain$Response(params?: RateBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<RatingDto>> {
    return rateBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rateBook$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  rateBook$Plain(params?: RateBook$Plain$Params, context?: HttpContext): Observable<RatingDto> {
    return this.rateBook$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<RatingDto>): RatingDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rateBook()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  rateBook$Response(params?: RateBook$Params, context?: HttpContext): Observable<StrictHttpResponse<RatingDto>> {
    return rateBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rateBook$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  rateBook(params?: RateBook$Params, context?: HttpContext): Observable<RatingDto> {
    return this.rateBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<RatingDto>): RatingDto => r.body)
    );
  }

  /** Path part for operation `getBookRatings()` */
  static readonly GetBookRatingsPath = '/api/BookRatings/{bookId}/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBookRatings$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookRatings$Plain$Response(params: GetBookRatings$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RatingDto>>> {
    return getBookRatings$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBookRatings$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookRatings$Plain(params: GetBookRatings$Plain$Params, context?: HttpContext): Observable<Array<RatingDto>> {
    return this.getBookRatings$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<RatingDto>>): Array<RatingDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBookRatings()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookRatings$Response(params: GetBookRatings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RatingDto>>> {
    return getBookRatings(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBookRatings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookRatings(params: GetBookRatings$Params, context?: HttpContext): Observable<Array<RatingDto>> {
    return this.getBookRatings$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<RatingDto>>): Array<RatingDto> => r.body)
    );
  }

}
