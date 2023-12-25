import { createAction, props } from '@ngrx/store';
import { BookAnonymousDto, BookDto, CreateBookDto } from '../../api/models';

export const addBook = createAction(
  '[Books] Add Book',
  props<{ bookDto: CreateBookDto }>()
);

export const addBookSuccess = createAction(
  '[Books] Add Book Success',
  props<{ book: BookDto }>()
);

export const addBookFailure = createAction(
  '[Books] Add Book Failure',
  props<{ error: string }>()
);

export const getMyBooks = createAction('[Books] Get My Books');

export const getMyBooksSuccess = createAction(
  '[Books] Get My Books Success',
  props<{ books: Array<BookDto> }>()
);

export const getMyBooksFailure = createAction(
  '[Books] Get My Books Failure',
  props<{ error: string }>()
);

export const getOthersBooks = createAction('[Books] Get Others Books');

export const getOthersBooksSuccess = createAction(
  '[Books] Get Others Books Success',
  props<{ books: Array<BookAnonymousDto> }>()
);

export const getOthersBooksFailure = createAction(
  '[Books] Get Others Books Failure',
  props<{ error: string }>()
);
