import { createSelector } from '@ngrx/store';
import { orderBy } from 'lodash-es';
import { AppState } from '../../app-state';
import { MeetingStatus } from '../meeting-status.enum';
import { MeetingState, MeetingsState } from './meetings.reducer';

export const selectFeature = (state: AppState) => state.meetings;

export const selectAllMeetingStates = createSelector(
  selectFeature,
  state => state.allMeetingStates
);

export const selectIsLoadingAllMeetings = createSelector(
  selectFeature,
  state => state.isLoadingAllMeetings
);

export const selectAllMeetingsError = createSelector(
  selectFeature,
  state => state.allMeetingsError
);

export const selectLastMeeting = createSelector(
  selectFeature,
  state =>
    orderBy(
      state.allMeetingStates.filter(
        m => m.meeting?.status === MeetingStatus.Closed
      ),
      m => m.meeting.dateTime,
      'desc'
    ).find(m => m)?.meeting ?? null
);

export const selectNextMeeting = createSelector(
  selectFeature,
  state =>
    orderBy(
      state.allMeetingStates.filter(
        m => m.meeting?.status !== MeetingStatus.Closed
      ),
      m => m.meeting.dateTime
    ).find(m => m)?.meeting ?? null
);

export const selectPastMeetings = createSelector(selectFeature, state =>
  orderBy(
    state.allMeetingStates.filter(
      m => m.meeting?.status === MeetingStatus.Closed
    ),
    m => m.meeting.dateTime
  ).map(m => m.meeting)
);

export const selectMeetingState = (props: { meetingId: string }) =>
  createSelector(
    selectFeature,
    (state: MeetingsState): MeetingState | null =>
      state.allMeetingStates.find(m => m.meeting.id === props.meetingId) ?? null
  );

export const selectLiveMeetingConnected = createSelector(
  selectFeature,
  state => state.liveMeetingConnected
);
