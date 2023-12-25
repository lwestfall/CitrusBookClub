import { createReducer, on } from '@ngrx/store';

import _ from 'lodash';
import { BookDto } from '../../api/models';
import * as bookActions from './books.actions';

export interface BooksState {
  mine: BookShelfState;
  others: BookShelfState;
  addForm: {
    pending: boolean;
    error: string | null;
  };
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
        books: _.orderBy([...state.mine.books, action.book], b => b.title),
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
        books: action.books,
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
  )
);
