import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';

export const selectFeature = (state: AppState) => state.meetings;

export const selectIsLoadingNextMeeting = createSelector(
  selectFeature,
  state => state.isLoadingNextMeeting
);

export const selectNextMeeting = createSelector(
  selectFeature,
  state => state.nextMeeting
);

export const selectNextMeetingError = createSelector(
  selectFeature,
  state => state.nextMeetingError
);
