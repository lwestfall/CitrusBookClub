import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BooksService } from '../../api/services';
import * as actions from './books.actions';

@Injectable()
export class BooksEffects {
  getMyBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getMyBooks),
      mergeMap(() =>
        this.booksService.getUsersBooks().pipe(
          map(books => actions.getMyBooksSuccess({ books })),
          catchError(error =>
            of(actions.getMyBooksFailure({ error: error.message }))
          )
        )
      )
    );
  });

  getOthersBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getOthersBooks),
      mergeMap(() =>
        this.booksService.getOthersBooks().pipe(
          map(books => actions.getOthersBooksSuccess({ books })),
          catchError(error =>
            of(actions.getOthersBooksFailure({ error: error.message }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) {}
}
