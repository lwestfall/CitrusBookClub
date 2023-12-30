/* tslint:disable */
/* eslint-disable */
export interface CreateBookDto {
  author: string;
  description?: string | null;
  isbn?: string | null;
  pageCount?: number | null;
  thumbnailLink?: string | null;
  title: string;
  updateId?: string | null;
}
