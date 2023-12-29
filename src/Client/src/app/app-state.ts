import { BooksState } from './books/state/books.reducer';
import { MeetingsState } from './meetings/state/meetings.reducer';
import { UsersState } from './users/state/users.reducer';

export interface AppState {
  books: BooksState;
  users: UsersState;
  meetings: MeetingsState;
}
