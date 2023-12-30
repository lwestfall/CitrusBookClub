import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';

export const selectFeature = (state: AppState) => state.books;

export const selectIsLoadingMyBooks = createSelector(
  selectFeature,
  state => state.mine.isLoading
);

export const selectMyBooks = createSelector(
  selectFeature,
  state => state.mine.books
);

export const selectIsLoadingOthersBooks = createSelector(
  selectFeature,
  state => state.others.isLoading
);

export const selectOthersBooks = createSelector(
  selectFeature,
  state => state.others.books
);

export const selectMyBooksError = createSelector(
  selectFeature,
  state => state.mine.error
);

export const selectOthersBooksError = createSelector(
  selectFeature,
  state => state.others.error
);

export const selectAddFormPending = createSelector(
  selectFeature,
  state => state.addForm.pending
);

export const selectAddFormError = createSelector(
  selectFeature,
  state => state.addForm.error
);

export const selectMyRecommendations = createSelector(
  selectFeature,
  state => state.myRecommendations
);
