/* tslint:disable */
/* eslint-disable */
import { BookDto } from '../models/book-dto';
export interface MeetingSimpleDto {
  dateTime: string;
  id: string;
  previousMeeting?: MeetingSimpleDto | null;
  status?: string | null;
  winningBook?: BookDto | null;
  winningBookId?: string | null;
}
