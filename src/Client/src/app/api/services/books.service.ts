/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BookAnonymousDto } from '../models/book-anonymous-dto';
import { BookDto } from '../models/book-dto';
import { createBook } from '../fn/books/create-book';
import { CreateBook$Params } from '../fn/books/create-book';
import { createBook$Plain } from '../fn/books/create-book-plain';
import { CreateBook$Plain$Params } from '../fn/books/create-book-plain';
import { deleteBook } from '../fn/books/delete-book';
import { DeleteBook$Params } from '../fn/books/delete-book';
import { getBook } from '../fn/books/get-book';
import { GetBook$Params } from '../fn/books/get-book';
import { getBook$Plain } from '../fn/books/get-book-plain';
import { GetBook$Plain$Params } from '../fn/books/get-book-plain';
import { getBooks } from '../fn/books/get-books';
import { GetBooks$Params } from '../fn/books/get-books';
import { getBooks$Plain } from '../fn/books/get-books-plain';
import { GetBooks$Plain$Params } from '../fn/books/get-books-plain';
import { getOthersBooks } from '../fn/books/get-others-books';
import { GetOthersBooks$Params } from '../fn/books/get-others-books';
import { getOthersBooks$Plain } from '../fn/books/get-others-books-plain';
import { GetOthersBooks$Plain$Params } from '../fn/books/get-others-books-plain';
import { getUsersBooks } from '../fn/books/get-users-books';
import { GetUsersBooks$Params } from '../fn/books/get-users-books';
import { getUsersBooks$Plain } from '../fn/books/get-users-books-plain';
import { GetUsersBooks$Plain$Params } from '../fn/books/get-users-books-plain';

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
  getBooks$Plain$Response(params?: GetBooks$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookAnonymousDto>>> {
    return getBooks$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBooks$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooks$Plain(params?: GetBooks$Plain$Params, context?: HttpContext): Observable<Array<BookAnonymousDto>> {
    return this.getBooks$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookAnonymousDto>>): Array<BookAnonymousDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooks$Response(params?: GetBooks$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookAnonymousDto>>> {
    return getBooks(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooks(params?: GetBooks$Params, context?: HttpContext): Observable<Array<BookAnonymousDto>> {
    return this.getBooks$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookAnonymousDto>>): Array<BookAnonymousDto> => r.body)
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

  /** Path part for operation `getOthersBooks()` */
  static readonly GetOthersBooksPath = '/api/Books/others';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOthersBooks$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOthersBooks$Plain$Response(params?: GetOthersBooks$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookAnonymousDto>>> {
    return getOthersBooks$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOthersBooks$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOthersBooks$Plain(params?: GetOthersBooks$Plain$Params, context?: HttpContext): Observable<Array<BookAnonymousDto>> {
    return this.getOthersBooks$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookAnonymousDto>>): Array<BookAnonymousDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOthersBooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOthersBooks$Response(params?: GetOthersBooks$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookAnonymousDto>>> {
    return getOthersBooks(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOthersBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOthersBooks(params?: GetOthersBooks$Params, context?: HttpContext): Observable<Array<BookAnonymousDto>> {
    return this.getOthersBooks$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookAnonymousDto>>): Array<BookAnonymousDto> => r.body)
    );
  }

  /** Path part for operation `getUsersBooks()` */
  static readonly GetUsersBooksPath = '/api/Books/mine';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsersBooks$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersBooks$Plain$Response(params?: GetUsersBooks$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookDto>>> {
    return getUsersBooks$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsersBooks$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersBooks$Plain(params?: GetUsersBooks$Plain$Params, context?: HttpContext): Observable<Array<BookDto>> {
    return this.getUsersBooks$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookDto>>): Array<BookDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsersBooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersBooks$Response(params?: GetUsersBooks$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookDto>>> {
    return getUsersBooks(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsersBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersBooks(params?: GetUsersBooks$Params, context?: HttpContext): Observable<Array<BookDto>> {
    return this.getUsersBooks$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookDto>>): Array<BookDto> => r.body)
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

  /** Path part for operation `deleteBook()` */
  static readonly DeleteBookPath = '/api/Books/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBook$Response(params: DeleteBook$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBook(params: DeleteBook$Params, context?: HttpContext): Observable<void> {
    return this.deleteBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
