import { createReducer, on } from '@ngrx/store';

import { BookAnonymousDto, BookDto } from '../../api/models';
import * as bookActions from './books.actions';

export interface BooksState {
  myBooks: Array<BookDto>;
  othersBooks: Array<BookAnonymousDto>;
  isLoadingMyBooks: boolean;
  myBooksError: string | null;
  isLoadingOthersBooks: boolean;
  othersBooksError: string | null;
}

export const initialState: BooksState = {
  myBooks: [],
  othersBooks: [],
  isLoadingMyBooks: false,
  myBooksError: null,
  isLoadingOthersBooks: false,
  othersBooksError: null,
};

export const booksReducer = createReducer(
  initialState,
  on(
    bookActions.getMyBooks,
    (state): BooksState => ({ ...state, isLoadingMyBooks: true })
  ),
  on(
    bookActions.getMyBooksSuccess,
    (state, action): BooksState => ({
      ...state,
      isLoadingMyBooks: false,
      myBooks: action.books,
    })
  ),
  on(
    bookActions.getMyBooksFailure,
    (state, action): BooksState => ({
      ...state,
      isLoadingMyBooks: false,
      myBooksError: action.error,
    })
  ),
  on(
    bookActions.getOthersBooks,
    (state): BooksState => ({
      ...state,
      isLoadingOthersBooks: true,
    })
  ),
  on(
    bookActions.getOthersBooksSuccess,
    (state, action): BooksState => ({
      ...state,
      isLoadingOthersBooks: false,
      othersBooks: action.books,
    })
  ),
  on(
    bookActions.getOthersBooksFailure,
    (state, action): BooksState => ({
      ...state,
      isLoadingOthersBooks: false,
      othersBooksError: action.error,
    })
  )
);
