/* tslint:disable */
/* eslint-disable */
import { BookDto } from '../models/book-dto';
export interface MeetingSimpleDto {
  dateTime: string;
  id: string;
  status?: string | null;
  winningBook?: BookDto | null;
  winningBookId?: string | null;
}
