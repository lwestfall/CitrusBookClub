/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteUser } from '../fn/users/delete-user';
import { DeleteUser$Params } from '../fn/users/delete-user';
import { deleteUser$Plain } from '../fn/users/delete-user-plain';
import { DeleteUser$Plain$Params } from '../fn/users/delete-user-plain';
import { getAuthenticatedUser } from '../fn/users/get-authenticated-user';
import { GetAuthenticatedUser$Params } from '../fn/users/get-authenticated-user';
import { getAuthenticatedUser$Plain } from '../fn/users/get-authenticated-user-plain';
import { GetAuthenticatedUser$Plain$Params } from '../fn/users/get-authenticated-user-plain';
import { getUsers } from '../fn/users/get-users';
import { GetUsers$Params } from '../fn/users/get-users';
import { getUsers$Plain } from '../fn/users/get-users-plain';
import { GetUsers$Plain$Params } from '../fn/users/get-users-plain';
import { updateAuthenticatedUser } from '../fn/users/update-authenticated-user';
import { UpdateAuthenticatedUser$Params } from '../fn/users/update-authenticated-user';
import { updateAuthenticatedUser$Plain } from '../fn/users/update-authenticated-user-plain';
import { UpdateAuthenticatedUser$Plain$Params } from '../fn/users/update-authenticated-user-plain';
import { updateUser } from '../fn/users/update-user';
import { UpdateUser$Params } from '../fn/users/update-user';
import { updateUser$Plain } from '../fn/users/update-user-plain';
import { UpdateUser$Plain$Params } from '../fn/users/update-user-plain';
import { updateUserRoles } from '../fn/users/update-user-roles';
import { UpdateUserRoles$Params } from '../fn/users/update-user-roles';
import { updateUserRoles$Plain } from '../fn/users/update-user-roles-plain';
import { UpdateUserRoles$Plain$Params } from '../fn/users/update-user-roles-plain';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUsers()` */
  static readonly GetUsersPath = '/api/Users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Plain$Response(params?: GetUsers$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDto>>> {
    return getUsers$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsers$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Plain(params?: GetUsers$Plain$Params, context?: HttpContext): Observable<Array<UserDto>> {
    return this.getUsers$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>): Array<UserDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Response(params?: GetUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDto>>> {
    return getUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers(params?: GetUsers$Params, context?: HttpContext): Observable<Array<UserDto>> {
    return this.getUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>): Array<UserDto> => r.body)
    );
  }

  /** Path part for operation `getAuthenticatedUser()` */
  static readonly GetAuthenticatedUserPath = '/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAuthenticatedUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthenticatedUser$Plain$Response(params?: GetAuthenticatedUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getAuthenticatedUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAuthenticatedUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthenticatedUser$Plain(params?: GetAuthenticatedUser$Plain$Params, context?: HttpContext): Observable<UserDto> {
    return this.getAuthenticatedUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAuthenticatedUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthenticatedUser$Response(params?: GetAuthenticatedUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getAuthenticatedUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAuthenticatedUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthenticatedUser(params?: GetAuthenticatedUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.getAuthenticatedUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `updateAuthenticatedUser()` */
  static readonly UpdateAuthenticatedUserPath = '/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAuthenticatedUser$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateAuthenticatedUser$Plain$Response(params?: UpdateAuthenticatedUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return updateAuthenticatedUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAuthenticatedUser$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateAuthenticatedUser$Plain(params?: UpdateAuthenticatedUser$Plain$Params, context?: HttpContext): Observable<UserDto> {
    return this.updateAuthenticatedUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAuthenticatedUser()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateAuthenticatedUser$Response(params?: UpdateAuthenticatedUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return updateAuthenticatedUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAuthenticatedUser$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateAuthenticatedUser(params?: UpdateAuthenticatedUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.updateAuthenticatedUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/api/Users/{b64Email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateUser$Plain$Response(params: UpdateUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return updateUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateUser$Plain(params: UpdateUser$Plain$Params, context?: HttpContext): Observable<UserDto> {
    return this.updateUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/api/Users/{b64Email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Plain$Response(params: DeleteUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return deleteUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Plain(params: DeleteUser$Plain$Params, context?: HttpContext): Observable<UserDto> {
    return this.deleteUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<UserDto> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `updateUserRoles()` */
  static readonly UpdateUserRolesPath = '/api/Users/{b64Email}/roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserRoles$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateUserRoles$Plain$Response(params: UpdateUserRoles$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return updateUserRoles$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserRoles$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateUserRoles$Plain(params: UpdateUserRoles$Plain$Params, context?: HttpContext): Observable<UserDto> {
    return this.updateUserRoles$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserRoles()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateUserRoles$Response(params: UpdateUserRoles$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return updateUserRoles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserRoles$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateUserRoles(params: UpdateUserRoles$Params, context?: HttpContext): Observable<UserDto> {
    return this.updateUserRoles$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

}
