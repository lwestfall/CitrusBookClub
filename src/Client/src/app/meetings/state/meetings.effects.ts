import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MeetingsService } from '../../api/services';
import * as actions from './meetings.actions';

@Injectable()
export class MeetingsEffects {
  getNextMeeting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getNextMeeting),
      mergeMap(() =>
        this.meetingsService.getNextMeeting().pipe(
          map(nextMeeting => actions.getNextMeetingSuccess({ nextMeeting })),
          catchError(error =>
            of(actions.getNextMeetingFailure({ error: error.message }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private meetingsService: MeetingsService
  ) {}
}
