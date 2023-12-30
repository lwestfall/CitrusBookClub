import { createAction, props } from '@ngrx/store';
import { UpdateUserDto, UserDto } from '../../api/models';

export const getAuthenticatedUser = createAction(
  '[Users] Get Authenticated User'
);

export const getAuthenticatedUserSuccess = createAction(
  '[Users] Get Authenticated User Success',
  props<{ userDto: UserDto }>()
);

export const getAuthenticatedUserFailure = createAction(
  '[Users] Get Authenticated User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ b64Email: string; userDto: UpdateUserDto }>()
);

export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ userDto: UserDto }>()
);

export const updateUserFailure = createAction(
  '[Users] Update User Failure',
  props<{ error: string }>()
);

export const getAllUsers = createAction('[Users] Get All Users');

export const getAllUsersSuccess = createAction(
  '[Users] Get All Users Success',
  props<{ users: UserDto[] }>()
);

export const getAllUsersFailure = createAction(
  '[Users] Get All Users Failure',
  props<{ error: string }>()
);

export const updateUserRoles = createAction(
  '[Users] Update User Roles',
  props<{ b64Email: string; roles: string[] }>()
);

export const updateUserRolesSuccess = createAction(
  '[Users] Update User Roles Success',
  props<{ userDto: UserDto }>()
);

export const updateUserRolesFailure = createAction(
  '[Users] Update User Roles Failure',
  props<{ error: string }>()
);
