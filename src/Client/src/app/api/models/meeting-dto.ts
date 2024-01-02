/* tslint:disable */
/* eslint-disable */
import { BookDto } from '../models/book-dto';
import { BookRecommendationForMeetingDto } from '../models/book-recommendation-for-meeting-dto';
import { BookVoteDto } from '../models/book-vote-dto';
import { MeetingUserStateDto } from '../models/meeting-user-state-dto';
export interface MeetingDto {
  bookRecommendations: Array<BookRecommendationForMeetingDto>;
  dateTime: string;
  id: string;
  previousMeeting?: MeetingDto | null;
  state?: string | null;
  userStates: Array<MeetingUserStateDto>;
  votes: Array<BookVoteDto>;
  winningBook?: BookDto | null;
}
