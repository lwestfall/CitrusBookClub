import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BooksService } from '../../api/services';
import {
  getMyBooks,
  getMyBooksFailure,
  getMyBooksSuccess,
} from './books.actions';

@Injectable()
export class BooksEffects {
  getMyBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getMyBooks),
      mergeMap(() =>
        this.booksService.getUsersBooks().pipe(
          map(books => getMyBooksSuccess({ books })),
          catchError(error => of(getMyBooksFailure({ error: error.message })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) {}
}
