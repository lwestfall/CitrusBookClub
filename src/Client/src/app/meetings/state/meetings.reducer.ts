import { createReducer, on } from '@ngrx/store';
import { MeetingDto } from '../../api/models';
import * as meetingsActions from './meetings.actions';

export interface MeetingsState {
  nextMeeting: MeetingDto | null;
  loadingNextMeeting: boolean;
  nextMeetingError: string | null;
}

export const initialState: MeetingsState = {
  nextMeeting: null,
  loadingNextMeeting: false,
  nextMeetingError: null,
};

export const meetingsReducer = createReducer(
  initialState,
  on(
    meetingsActions.getNextMeeting,
    (state): MeetingsState => ({
      ...state,
      loadingNextMeeting: true,
    })
  ),
  on(
    meetingsActions.getNextMeetingSuccess,
    (state, action): MeetingsState => ({
      ...state,
      loadingNextMeeting: false,
      nextMeeting: action.nextMeeting,
    })
  ),
  on(
    meetingsActions.getNextMeetingFailure,
    (state, action): MeetingsState => ({
      ...state,
      loadingNextMeeting: false,
      nextMeetingError: action.error,
    })
  )
);
