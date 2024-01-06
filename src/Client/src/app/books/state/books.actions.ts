import { createAction, props } from '@ngrx/store';
import {
  BookAnonymousDto,
  BookDto,
  BookRecommendationDto,
  CreateBookDto,
} from '../../api/models';

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

export const deleteBook = createAction(
  '[Books] Delete Book',
  props<{ bookId: string }>()
);

export const deleteBookSuccess = createAction(
  '[Books] Delete Book Success',
  props<{ bookId: string }>()
);

export const deleteBookFailure = createAction(
  '[Books] Delete Book Failure',
  props<{ error: string }>()
);

export const getMyBookRecommendations = createAction(
  '[Books] Get My Recommendations'
);

export const getMyBookRecommendationsSuccess = createAction(
  '[Books] Get My Recommendations Success',
  props<{ bookRecommendations: Array<BookRecommendationDto> }>()
);

export const getMyBookRecommendationsFailure = createAction(
  '[Books] Get My Recommendations Failure',
  props<{ error: string }>()
);

export const recommendBookForMeeting = createAction(
  '[Books] Recommend Book For Meeting',
  props<{ bookId: string; meetingId: string }>()
);

export const recommendBookForMeetingSuccess = createAction(
  '[Books] Recommend Book For Meeting Success',
  props<{ bookRecommendation: BookRecommendationDto }>()
);

export const recommendBookForMeetingFailure = createAction(
  '[Books] Recommend Book For Meeting Failure',
  props<{ error: string }>()
);

export const rateBook = createAction(
  '[Books] Rate Book',
  props<{ bookId: string; rating: number }>()
);
