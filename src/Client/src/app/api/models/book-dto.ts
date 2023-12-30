/* tslint:disable */
/* eslint-disable */
import { UserSimpleDto } from '../models/user-simple-dto';
export interface BookDto {
  author: string;
  description?: string | null;
  id: string;
  isbn?: string | null;
  pageCount?: number | null;
  thumbnailLink?: string | null;
  title: string;
  user?: UserSimpleDto | null;
  userEmail?: string | null;
}
