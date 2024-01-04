import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import {
  selectIsLoadingAllMeetings,
  selectNextMeeting,
  selectPastMeetings,
} from '../state/meetings.selectors';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.css'],
})
export class MeetingsPageComponent {
  meetingNow = false;
  nextMeeting$: Observable<MeetingDto | null>;
  pastMeetings$: Observable<MeetingDto[]>;
  isLoadingMeetings$: Observable<boolean>;

  constructor(store: Store<AppState>) {
    this.nextMeeting$ = store.select(selectNextMeeting);
    this.pastMeetings$ = store.select(selectPastMeetings);
    this.isLoadingMeetings$ = store.select(selectIsLoadingAllMeetings);
  }
}
