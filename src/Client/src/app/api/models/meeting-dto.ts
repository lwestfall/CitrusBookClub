/* tslint:disable */
/* eslint-disable */
import { BookDto } from '../models/book-dto';
import { BookRecommendationForMeetingDto } from '../models/book-recommendation-for-meeting-dto';
import { BookVoteDto } from '../models/book-vote-dto';
export interface MeetingDto {
  bookRecommendations: Array<BookRecommendationForMeetingDto>;
  dateTime: string;
  id: string;
  previousMeeting?: MeetingDto | null;
  state?: string | null;
  votes: Array<BookVoteDto>;
  winningBook?: BookDto | null;
}
