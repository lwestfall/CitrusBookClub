import { createReducer, on } from '@ngrx/store';
import { MeetingDto } from '../../api/models';
import * as meetingsActions from './meetings.actions';

export interface MeetingsState {
  allMeetingStates: MeetingState[];
  isLoadingAllMeetings: boolean;
  allMeetingsError: string | null;
  liveMeetingConnected: boolean;
}

export interface MeetingState {
  meeting: MeetingDto;
  error: string | null;
}

export const initialState: MeetingsState = {
  allMeetingStates: [],
  isLoadingAllMeetings: false,
  allMeetingsError: null,
  liveMeetingConnected: false,
};

export const meetingsReducer = createReducer(
  initialState,
  on(
    meetingsActions.getAllMeetings,
    (state): MeetingsState => ({
      ...state,
      isLoadingAllMeetings: true,
      allMeetingsError: null,
    })
  ),
  on(
    meetingsActions.getAllMeetingsSuccess,
    (state, action): MeetingsState => ({
      ...state,
      allMeetingStates: action.meetings.map(meeting => ({
        meeting,
        error: null,
      })),
      isLoadingAllMeetings: false,
    })
  ),
  on(
    meetingsActions.getAllMeetingsFailure,
    (state, action): MeetingsState => ({
      ...state,
      isLoadingAllMeetings: false,
      allMeetingsError: action.error,
    })
  ),
  on(
    meetingsActions.handleMeetingUpdate,
    (state, action): MeetingsState => ({
      ...state,
      allMeetingStates: handleMeetingUpdate(state, action),
    })
  ),
  on(
    meetingsActions.handleMeetingError,
    (state, action): MeetingsState => ({
      ...state,
      allMeetingStates: state.allMeetingStates.map(meetingState =>
        meetingState.meeting.id === action.meetingId
          ? { meeting: meetingState.meeting, error: action.error }
          : meetingState
      ),
    })
  ),
  on(
    meetingsActions.connectToLiveMeetingHubSuccess,
    (state): MeetingsState => ({
      ...state,
      liveMeetingConnected: true,
    })
  )
);

function handleMeetingUpdate(
  state: MeetingsState,
  action: {
    meeting: MeetingDto;
  }
): MeetingState[] {
  const existingMeetingState = state.allMeetingStates.find(
    ms => ms.meeting.id === action.meeting.id
  );

  if (!existingMeetingState) {
    return [
      ...state.allMeetingStates,
      {
        meeting: action.meeting,
        error: null,
      },
    ];
  }

  return state.allMeetingStates.map(meetingState =>
    meetingState.meeting.id === action.meeting.id
      ? { meeting: action.meeting, error: null }
      : meetingState
  );
}
