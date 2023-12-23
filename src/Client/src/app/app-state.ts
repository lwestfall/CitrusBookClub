import { BooksState } from './books/state/books.reducer';

export interface AppState {
  books: BooksState;
}
