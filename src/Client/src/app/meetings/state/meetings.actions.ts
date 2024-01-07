import { createAction, props } from '@ngrx/store';
import { CreateMeetingDto, MeetingDto } from '../../api/models';

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

export const deleteMeeting = createAction(
  '[Meetings] Delete Meeting',
  props<{ meetingId: string }>()
);

export const deleteMeetingSuccess = createAction(
  '[Meetings] Delete Meeting Success',
  props<{ meetingId: string }>()
);

export const deleteMeetingFailure = createAction(
  '[Meetings] Delete Meeting Failure',
  props<{ error: string }>()
);

export const updateMeeting = createAction(
  '[Meetings] Update Meeting',
  props<{ meetingId: string; dateTime: string }>()
);

export const updateMeetingSuccess = createAction(
  '[Meetings] Update Meeting Success',
  props<{ meeting: MeetingDto }>()
);

export const updateMeetingFailure = createAction(
  '[Meetings] Update Meeting Failure',
  props<{ error: string }>()
);

export const createNewMeeting = createAction(
  '[Meetings] Create New Meeting',
  props<{ newMeeting: CreateMeetingDto }>()
);
