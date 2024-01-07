/* tslint:disable */
/* eslint-disable */
import { BookRatingDto } from '../models/book-rating-dto';
import { UserSimpleDto } from '../models/user-simple-dto';
export interface BookDto {
  author: string;
  description?: string | null;
  id: string;
  isbn?: string | null;
  pageCount?: number | null;
  ratings?: Array<BookRatingDto> | null;
  thumbnailLink?: string | null;
  title: string;
  user?: UserSimpleDto | null;
  userEmail?: string | null;
}
