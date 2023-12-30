import { createReducer, on } from '@ngrx/store';

import _ from 'lodash';
import { BookDto, BookRecommendationDto } from '../../api/models';
import { fetchAppData } from '../../app-state';
import * as bookActions from './books.actions';

export interface BooksState {
  mine: BookShelfState;
  others: BookShelfState;
  addForm: {
    pending: boolean;
    error: string | null;
  };
  myRecommendations: BookRecommendationDto[];
}

interface BookShelfState {
  books: BookDto[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: BooksState = {
  mine: {
    books: [],
    isLoading: false,
    error: null,
  },
  others: {
    books: [],
    isLoading: false,
    error: null,
  },
  addForm: {
    pending: false,
    error: null,
  },
  myRecommendations: [],
};

export const booksReducer = createReducer(
  initialState,
  on(bookActions.addBook, (state): BooksState => {
    return {
      ...state,
      mine: {
        ...state.mine,
        isLoading: true,
        error: null,
      },
      addForm: {
        ...state.addForm,
        pending: true,
        error: null,
      },
    };
  }),
  on(
    bookActions.addBookSuccess,
    (state, action): BooksState => ({
      ...state,
      mine: {
        ...state.mine,
        isLoading: false,
        books: sortBooksByTitle([...state.mine.books, action.book]),
      },
      addForm: {
        ...state.addForm,
        pending: false,
      },
    })
  ),
  on(
    bookActions.addBookFailure,
    (state, action): BooksState => ({
      ...state,
      mine: {
        ...state.mine,
        isLoading: false,
      },
      addForm: {
        ...state.addForm,
        pending: false,
        error: action.error,
      },
    })
  ),
  on(
    bookActions.getMyBooks,
    (state): BooksState => ({
      ...state,
      mine: {
        ...state.mine,
        isLoading: true,
      },
    })
  ),
  on(
    bookActions.getMyBooksSuccess,
    (state, action): BooksState => ({
      ...state,
      mine: {
        ...state.mine,
        isLoading: false,
        books: sortBooksByTitle(action.books),
      },
    })
  ),
  on(
    bookActions.getMyBooksFailure,
    (state, action): BooksState => ({
      ...state,
      mine: {
        ...state.mine,
        isLoading: false,
        error: action.error,
      },
    })
  ),
  on(
    bookActions.getOthersBooks,
    (state): BooksState => ({
      ...state,
      others: {
        ...state.others,
        isLoading: true,
      },
    })
  ),
  on(
    bookActions.getOthersBooksSuccess,
    (state, action): BooksState => ({
      ...state,
      others: {
        ...state.others,
        isLoading: false,
        books: action.books,
      },
    })
  ),
  on(
    bookActions.getOthersBooksFailure,
    (state, action): BooksState => ({
      ...state,
      others: {
        ...state.others,
        isLoading: false,
        error: action.error,
      },
    })
  ),
  on(
    bookActions.deleteBook,
    (state): BooksState => ({
      ...state,
      mine: {
        ...state.mine,
        isLoading: true,
      },
    })
  ),
  on(
    bookActions.deleteBookSuccess,
    (state, action): BooksState => ({
      ...state,
      mine: {
        ...state.mine,
        isLoading: false,
        books: sortBooksByTitle(
          state.mine.books.filter(b => b.id !== action.bookId)
        ),
      },
    })
  ),
  on(
    bookActions.deleteBookFailure,
    (state, action): BooksState => ({
      ...state,
      mine: {
        ...state.mine,
        isLoading: false,
        error: action.error,
      },
    })
  ),
  on(
    bookActions.getMyBookRecommendations,
    (state): BooksState => ({
      ...state,
    })
  ),
  on(
    bookActions.getMyBookRecommendationsSuccess,
    (state, action): BooksState => ({
      ...state,
      myRecommendations: action.bookRecommendations,
    })
  ),
  on(
    bookActions.getMyBookRecommendationsFailure,
    (state): BooksState => ({
      ...state,
    })
  ),
  on(
    bookActions.recommendBookForMeeting,
    (state): BooksState => ({
      ...state,
    })
  ),
  on(
    bookActions.recommendBookForMeetingSuccess,
    (state): BooksState => ({
      ...state,
    })
  ),
  on(
    bookActions.recommendBookForMeetingFailure,
    (state): BooksState => ({
      ...state,
    })
  ),
  on(
    fetchAppData,
    (state): BooksState => ({
      ...state,
      mine: {
        ...state.mine,
        isLoading: true,
      },
    })
  )
);

function sortBooksByTitle(books: BookDto[]) {
  return _.orderBy(books, b => b.title);
}
