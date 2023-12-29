import { createReducer, on } from '@ngrx/store';
import { MeetingDto } from '../../api/models';
import * as meetingsActions from './meetings.actions';

export interface MeetingsState {
  nextMeeting: MeetingDto | null;
  isLoadingNextMeeting: boolean;
  nextMeetingError: string | null;
}

export const initialState: MeetingsState = {
  nextMeeting: null,
  isLoadingNextMeeting: false,
  nextMeetingError: null,
};

export const meetingsReducer = createReducer(
  initialState,
  on(
    meetingsActions.getNextMeeting,
    (state): MeetingsState => ({
      ...state,
      isLoadingNextMeeting: true,
    })
  ),
  on(
    meetingsActions.getNextMeetingSuccess,
    (state, action): MeetingsState => ({
      ...state,
      isLoadingNextMeeting: false,
      nextMeeting: action.nextMeeting,
    })
  ),
  on(
    meetingsActions.getNextMeetingFailure,
    (state, action): MeetingsState => ({
      ...state,
      isLoadingNextMeeting: false,
      nextMeetingError: action.error,
    })
  )
);
