import { createAction, props } from '@ngrx/store';
import { MeetingDto } from '../../api/models';

export const getAllMeetings = createAction('[Meetings] Get All Meetings');

export const getAllMeetingsSuccess = createAction(
  '[Meetings] Get All Meetings Success',
  props<{ meetings: MeetingDto[] }>()
);

export const getAllMeetingsFailure = createAction(
  '[Meetings] Get All Meetings Failure',
  props<{ error: string }>()
);

export const handleMeetingUpdate = createAction(
  '[Meetings] Handle Meeting Update',
  props<{ meeting: MeetingDto }>()
);

export const handleMeetingError = createAction(
  '[Meetings] Handle Meeting Update',
  props<{ meetingId: string; error: string }>()
);

export const connectToLiveMeetingHub = createAction(
  '[Meetings] Connect to Live Meeting Hub'
);

export const connectToLiveMeetingHubSuccess = createAction(
  '[Meetings] Connect to Live Meeting Hub Success'
);
