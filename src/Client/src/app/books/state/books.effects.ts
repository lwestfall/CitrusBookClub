import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BooksService } from '../../api/services';
import * as actions from './books.actions';

@Injectable()
export class BooksEffects {
  addBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.addBook),
      mergeMap(({ bookDto }) =>
        this.booksService.createBook({ body: bookDto }).pipe(
          map(book => actions.addBookSuccess({ book })),
          catchError(error =>
            of(actions.addBookFailure({ error: error.message }))
          )
        )
      )
    );
  });

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

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.deleteBook),
      mergeMap(({ bookId }) =>
        this.booksService.deleteBook({ id: bookId }).pipe(
          map(() => actions.deleteBookSuccess({ bookId })),
          catchError(error =>
            of(actions.deleteBookFailure({ error: error.message }))
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
