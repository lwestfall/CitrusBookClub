/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { BookDto } from '../../models/book-dto';
import { CreateBookDto } from '../../models/create-book-dto';

export interface CreateBook$Params {
      body?: CreateBookDto
}

export function createBook(http: HttpClient, rootUrl: string, params?: CreateBook$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
  const rb = new RequestBuilder(rootUrl, createBook.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookDto>;
    })
  );
}

createBook.PATH = '/api/Books';
