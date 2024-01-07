/* tslint:disable */
/* eslint-disable */
import { BookDto } from '../models/book-dto';
import { UserSimpleDto } from '../models/user-simple-dto';
export interface BookRecommendationForMeetingDto {
  book: BookDto;
  recommendedBy: UserSimpleDto;
}
