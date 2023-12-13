/* tslint:disable */
/* eslint-disable */
import { BookDto } from '../models/book-dto';
import { BookVoteDto } from '../models/book-vote-dto';
export interface MeetingDto {
  dateTime?: string;
  id?: string;
  votes?: Array<BookVoteDto>;
  winningBook?: BookDto;
  winningBookId?: string | null;
}
