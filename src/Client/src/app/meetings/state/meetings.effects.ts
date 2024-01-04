import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { MeetingsService } from '../../api/services';
import { fetchAppData } from '../../app-state';
import { LiveMeetingService } from '../../services/websockets/live-meeting.service';
import * as actions from './meetings.actions';

@Injectable()
export class MeetingsEffects {
  getAllMeetings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getAllMeetings, fetchAppData),
      mergeMap(() =>
        this.meetingsService.getMeetings().pipe(
          map(meetings => actions.getAllMeetingsSuccess({ meetings })),
          catchError(error => of(actions.getAllMeetingsFailure({ error })))
        )
      )
    );
  });

  connectToLiveMeetingHub$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.connectToLiveMeetingHub, fetchAppData),
      mergeMap(() =>
        from(this.liveMeetingService.start()).pipe(
          map(() => actions.connectToLiveMeetingHubSuccess())
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private meetingsService: MeetingsService,
    private liveMeetingService: LiveMeetingService
  ) {}
}
