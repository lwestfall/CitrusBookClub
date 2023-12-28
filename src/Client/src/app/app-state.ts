import { BooksState } from './books/state/books.reducer';
import { UsersState } from './users/state/users.reducer';

export interface AppState {
  books: BooksState;
  users: UsersState;
}
