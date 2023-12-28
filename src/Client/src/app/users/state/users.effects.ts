import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersService } from '../../api/services';
import * as actions from './users.actions';

@Injectable()
export class UsersEffects {
  getAuthenticatedUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getAuthenticatedUser),
      mergeMap(() =>
        this.usersService.getAuthenticatedUser().pipe(
          map(userDto => actions.getAuthenticatedUserSuccess({ userDto })),
          catchError(error =>
            of(actions.getAuthenticatedUserFailure({ error: error.message }))
          )
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.updateUser),
      mergeMap(({ b64Email, userDto }) =>
        this.usersService.updateUser({ body: userDto, b64Email }).pipe(
          map(user => actions.updateUserSuccess({ userDto: user })),
          catchError(error =>
            of(actions.updateUserFailure({ error: error.message }))
          )
        )
      )
    );
  });

  getAllUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getAllUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map(users => actions.getAllUsersSuccess({ users })),
          catchError(error =>
            of(actions.getAllUsersFailure({ error: error.message }))
          )
        )
      )
    );
  });

  updateUserRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.updateUserRoles),
      mergeMap(({ b64Email, roles }) =>
        this.usersService.updateUserRoles({ b64Email, body: roles }).pipe(
          map(user => actions.updateUserRolesSuccess({ userDto: user })),
          catchError(error =>
            of(actions.updateUserRolesFailure({ error: error.message }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}
}
