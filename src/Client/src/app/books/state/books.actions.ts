import { createAction, props } from '@ngrx/store';
import { BookDto, CreateBookDto } from '../../api/models';

export const addBook = createAction(
  '[Books] Add Book',
  props<{ bookDto: CreateBookDto }>()
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

// export const BooksActions = createActionGroup({
//   source: 'Books',
//   events: {
//     'Add Book': props<{ bookId: string }>(),
//     'Remove Book': props<{ bookId: string }>(),
//   },
// });

// export const BooksApiActions = createActionGroup({
//   source: 'Books API',
//   events: {
//     'Retrieved My Books': props<{ books: ReadonlyArray<BookDto> }>(),
//     'Retrieved Others Books': props<{
//       books: ReadonlyArray<BookAnonymousDto>;
//     }>(),
//   },
// });
