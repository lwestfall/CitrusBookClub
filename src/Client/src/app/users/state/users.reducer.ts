import { createReducer, on } from '@ngrx/store';
import _ from 'lodash';
import { UserDto } from '../../api/models';
import * as usersActions from './users.actions';

export interface UsersState {
  authenticatedUser: SingleUserState;
  allUsers: AllUsersState;
}

interface SingleUserState {
  user: UserDto | null;
  b64Email: string | null;
  isLoading: boolean;
  error: string | null;
}

interface AllUsersState {
  users: UserDto[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  authenticatedUser: {
    user: null,
    b64Email: null,
    isLoading: false,
    error: null,
  },
  allUsers: {
    users: [],
    isLoading: false,
    error: null,
  },
};

export const usersReducer = createReducer(
  initialState,
  on(usersActions.getAuthenticatedUser, (state): UsersState => {
    return {
      ...state,
      authenticatedUser: {
        ...state.authenticatedUser,
        isLoading: true,
        error: null,
      },
    };
  }),
  on(
    usersActions.getAuthenticatedUserSuccess,
    (state, action): UsersState => ({
      ...state,
      authenticatedUser: {
        ...state.authenticatedUser,
        user: action.userDto,
        isLoading: false,
        error: null,
      },
    })
  ),
  on(
    usersActions.getAuthenticatedUserFailure,
    (state, action): UsersState => ({
      ...state,
      authenticatedUser: {
        ...state.authenticatedUser,
        isLoading: false,
        error: action.error,
      },
    })
  ),
  on(usersActions.updateUser, (state): UsersState => {
    return {
      ...state,
      authenticatedUser: {
        ...state.authenticatedUser,
        isLoading: true,
        error: null,
      },
    };
  }),
  on(
    usersActions.updateUserSuccess,
    (state, action): UsersState => ({
      ...state,
      authenticatedUser: {
        ...state.authenticatedUser,
        isLoading: false,
        error: null,
      },
      allUsers: {
        ...state.allUsers,
        users: updateUserInAll(state.allUsers.users, action.userDto),
        isLoading: false,
        error: null,
      },
    })
  ),
  on(
    usersActions.updateUserFailure,
    (state, action): UsersState => ({
      ...state,
      authenticatedUser: {
        ...state.authenticatedUser,
        isLoading: false,
        error: action.error,
      },
    })
  ),
  on(usersActions.getAllUsers, (state): UsersState => {
    return {
      ...state,
      allUsers: {
        ...state.allUsers,
        isLoading: true,
        error: null,
      },
    };
  }),
  on(
    usersActions.getAllUsersSuccess,
    (state, action): UsersState => ({
      ...state,
      allUsers: {
        ...state.allUsers,
        users: sortUsers(action.users),
        isLoading: false,
        error: null,
      },
    })
  ),
  on(
    usersActions.getAllUsersFailure,
    (state, action): UsersState => ({
      ...state,
      allUsers: {
        ...state.allUsers,
        isLoading: false,
        error: action.error,
      },
    })
  ),
  on(usersActions.updateUserRoles, (state): UsersState => {
    return {
      ...state,
      authenticatedUser: {
        ...state.authenticatedUser,
        isLoading: true,
        error: null,
      },
      allUsers: {
        ...state.allUsers,
        isLoading: true,
        error: null,
      },
    };
  }),
  on(
    usersActions.updateUserRolesSuccess,
    (state, action): UsersState => ({
      ...state,
      authenticatedUser: {
        ...state.authenticatedUser,
        isLoading: false,
        error: null,
      },
      allUsers: {
        ...state.allUsers,
        users: updateUserInAll(state.allUsers.users, action.userDto),
        isLoading: false,
        error: null,
      },
    })
  )
);

function updateUserInAll(users: UserDto[], user: UserDto): UserDto[] {
  const copy = [...users];
  const index = copy.findIndex(u => u.emailAddress === user.emailAddress);

  if (index === -1) {
    return users;
  }

  copy[index] = user;

  return sortUsers(copy);
}

function sortUsers(users: UserDto[]): UserDto[] {
  return _.orderBy(users, ['firstName', 'lastName']);
}
