/* tslint:disable */
/* eslint-disable */
import { BookDto } from '../models/book-dto';
import { MeetingDto } from '../models/meeting-dto';
export interface BookRecommendationDto {
  book: BookDto;
  meeting: MeetingDto;
}
