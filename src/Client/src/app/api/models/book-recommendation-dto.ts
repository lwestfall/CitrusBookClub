/* tslint:disable */
/* eslint-disable */
import { BookDto } from '../models/book-dto';
import { MeetingSimpleDto } from '../models/meeting-simple-dto';
export interface BookRecommendationDto {
  book: BookDto;
  meeting: MeetingSimpleDto;
}
