import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';

export const selectFeature = (state: AppState) => state.users;

export const selectAuthenticatedUser = createSelector(
  selectFeature,
  state => state.authenticatedUser.user
);

export const selectAuthenticatedUserIsVerified = createSelector(
  selectAuthenticatedUser,
  user => user?.roles?.includes('Verified') ?? false
);

export const selectAuthenticatedUserIsAdmin = createSelector(
  selectAuthenticatedUser,
  user => user?.roles?.includes('Admin') ?? false
);

export const selectAuthenticatedUserError = createSelector(
  selectFeature,
  state => state.authenticatedUser.error
);

export const selectAuthenticatedUserIsLoading = createSelector(
  selectFeature,
  state => state.authenticatedUser.isLoading
);

export const selectAllUsers = createSelector(
  selectFeature,
  state => state.allUsers.users
);

export const selectAllUsersError = createSelector(
  selectFeature,
  state => state.allUsers.error
);

export const selectAllUsersIsLoading = createSelector(
  selectFeature,
  state => state.allUsers.isLoading
);
