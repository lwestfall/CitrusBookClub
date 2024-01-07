import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  BookRatingsService,
  BookRecommendationsService,
  BooksService,
} from '../../api/services';
import { fetchAppData } from '../../app-state';
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
      ofType(actions.getMyBooks, fetchAppData),
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

  getMyBookRecommendations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        actions.getMyBookRecommendations,
        actions.recommendBookForMeetingSuccess,
        actions.deleteBookSuccess,
        fetchAppData
      ),
      mergeMap(() =>
        this.bookRecommendationsService.getMyBookRecommendations().pipe(
          map(bookRecommendations =>
            actions.getMyBookRecommendationsSuccess({ bookRecommendations })
          ),
          catchError(error =>
            of(
              actions.getMyBookRecommendationsFailure({
                error: error.message,
              })
            )
          )
        )
      )
    );
  });

  recommendBookForMeeting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.recommendBookForMeeting),
      mergeMap(({ bookId, meetingId }) =>
        this.bookRecommendationsService
          .recommendBook({ bookId, meetingId })
          .pipe(
            map(bookRecommendation =>
              actions.recommendBookForMeetingSuccess({ bookRecommendation })
            ),
            catchError(error =>
              of(
                actions.recommendBookForMeetingFailure({
                  error: error.message,
                })
              )
            )
          )
      )
    );
  });

  rateBook$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(actions.rateBook),
        mergeMap(({ bookId, rating }) =>
          this.bookRatingsService.rateBook({ body: { bookId, rating } })
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private bookRecommendationsService: BookRecommendationsService,
    private bookRatingsService: BookRatingsService
  ) {}
}
