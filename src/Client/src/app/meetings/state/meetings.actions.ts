import { createAction, props } from '@ngrx/store';
import { MeetingDto } from '../../api/models';

export const getNextMeeting = createAction('[Meetings] Get Next Meeting');

export const getNextMeetingSuccess = createAction(
  '[Meetings] Get Next Meeting Success',
  props<{ nextMeeting: MeetingDto }>()
);

export const getNextMeetingFailure = createAction(
  '[Meetings] Get Next Meeting Failure',
  props<{ error: string }>()
);

export const meetingStarted = createAction(
  '[Meetings] Meeting Started',
  props<{ meeting: MeetingDto }>()
);

export const liveMeetingUpdate = createAction(
  '[Meetings] Live Meeting Update',
  props<{ meeting: MeetingDto }>()
);

export const liveMeetingError = createAction(
  '[Meetings] Live Meeting Error',
  props<{ error: string }>()
);

export const leftMeeting = createAction(
  '[Meetings] Left Meeting',
  props<{ meetingId: string }>()
);
