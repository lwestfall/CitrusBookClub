/* tslint:disable */
/* eslint-disable */
import { BookRatingDto } from '../models/book-rating-dto';
export interface BookAnonymousDto {
  author: string;
  description?: string | null;
  id: string;
  isbn?: string | null;
  pageCount?: number | null;
  ratings?: Array<BookRatingDto> | null;
  thumbnailLink?: string | null;
  title: string;
}
