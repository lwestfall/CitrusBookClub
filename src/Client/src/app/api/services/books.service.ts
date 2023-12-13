/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { StrictHttpResponse } from '../strict-http-response';

import { CreateBook$Params, createBook } from '../fn/books/create-book';
import { CreateBook$Plain$Params, createBook$Plain } from '../fn/books/create-book-plain';
import { GetBook$Params, getBook } from '../fn/books/get-book';
import { GetBook$Plain$Params, getBook$Plain } from '../fn/books/get-book-plain';
import { GetBooks$Params, getBooks } from '../fn/books/get-books';
import { GetBooks$Plain$Params, getBooks$Plain } from '../fn/books/get-books-plain';
import { BookDto } from '../models/book-dto';

@Injectable({ providedIn: 'root' })
export class BooksService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getBooks()` */
  static readonly GetBooksPath = '/api/Books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBooks$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooks$Plain$Response(params?: GetBooks$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookDto>>> {
    return getBooks$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBooks$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooks$Plain(params?: GetBooks$Plain$Params, context?: HttpContext): Observable<Array<BookDto>> {
    return this.getBooks$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookDto>>): Array<BookDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooks$Response(params?: GetBooks$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookDto>>> {
    return getBooks(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooks(params?: GetBooks$Params, context?: HttpContext): Observable<Array<BookDto>> {
    return this.getBooks$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookDto>>): Array<BookDto> => r.body)
    );
  }

  /** Path part for operation `createBook()` */
  static readonly CreateBookPath = '/api/Books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBook$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createBook$Plain$Response(params?: CreateBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
    return createBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createBook$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createBook$Plain(params?: CreateBook$Plain$Params, context?: HttpContext): Observable<BookDto> {
    return this.createBook$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookDto>): BookDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBook()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createBook$Response(params?: CreateBook$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
    return createBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createBook$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createBook(params?: CreateBook$Params, context?: HttpContext): Observable<BookDto> {
    return this.createBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookDto>): BookDto => r.body)
    );
  }

  /** Path part for operation `getBook()` */
  static readonly GetBookPath = '/api/Books/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBook$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBook$Plain$Response(params: GetBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
    return getBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBook$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBook$Plain(params: GetBook$Plain$Params, context?: HttpContext): Observable<BookDto> {
    return this.getBook$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookDto>): BookDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBook$Response(params: GetBook$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
    return getBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBook(params: GetBook$Params, context?: HttpContext): Observable<BookDto> {
    return this.getBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookDto>): BookDto => r.body)
    );
  }

}
