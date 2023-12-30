import { createAction } from '@ngrx/store';
import { BooksState } from './books/state/books.reducer';
import { MeetingsState } from './meetings/state/meetings.reducer';
import { UsersState } from './users/state/users.reducer';

export interface AppState {
  books: BooksState;
  users: UsersState;
  meetings: MeetingsState;
  initDataFetched: boolean;
}

export const fetchAppData = createAction('[App] Fetch App Data');
