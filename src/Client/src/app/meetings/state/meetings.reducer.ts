import { createReducer, on } from '@ngrx/store';
import { MeetingDto } from '../../api/models';
import * as meetingsActions from './meetings.actions';

export interface MeetingsState {
  nextMeeting: MeetingDto | null;
  isLoadingNextMeeting: boolean;
  nextMeetingError: string | null;
  liveMeeting: LiveMeetingState | null;
  liveMeetingError: string | null;
}

export interface LiveMeetingState {
  meeting: MeetingDto | null;
  started: boolean;
  joined: boolean;
}

export const initialState: MeetingsState = {
  nextMeeting: null,
  isLoadingNextMeeting: false,
  nextMeetingError: null,
  liveMeeting: null,
  liveMeetingError: null,
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
  ),
  on(
    meetingsActions.meetingStarted,
    (state, action): MeetingsState => ({
      ...state,
      liveMeeting: {
        meeting: action.meeting,
        started: true,
        joined: false,
      },
    })
  ),
  on(
    meetingsActions.liveMeetingUpdate,
    (state, action): MeetingsState => ({
      ...state,
      liveMeeting: {
        meeting: action.meeting,
        started: true,
        joined: true,
      },
    })
  ),
  on(
    meetingsActions.leftMeeting,
    (state): MeetingsState => ({
      ...state,
      liveMeeting: null,
    })
  )
);
