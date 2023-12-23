import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';

export const selectFeature = (state: AppState) => state.books;

export const selectIsLoadingMyBooks = createSelector(
  selectFeature,
  state => state.isLoadingMyBooks
);

export const selectMyBooks = createSelector(
  selectFeature,
  state => state.myBooks
);

export const selectIsLoadingOthersBooks = createSelector(
  selectFeature,
  state => state.isLoadingOthersBooks
);

export const selectOthersBooks = createSelector(
  selectFeature,
  state => state.othersBooks
);

export const selectMyBooksError = createSelector(
  selectFeature,
  state => state.myBooksError
);

export const selectOthersBooksError = createSelector(
  selectFeature,
  state => state.othersBooksError
);
