/* tslint:disable */
/* eslint-disable */
import { BookDto } from '../models/book-dto';
export interface MeetingSimpleDto {
  dateTime?: string;
  id?: string;
  winningBook?: BookDto;
  winningBookId?: string | null;
}
