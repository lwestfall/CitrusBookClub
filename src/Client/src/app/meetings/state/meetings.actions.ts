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
