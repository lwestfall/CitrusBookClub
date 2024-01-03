import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { BookRecommendationDto, MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import { selectMyRecommendations } from '../../books/state/books.selectors';
import { LiveMeetingService } from '../../services/websockets/live-meeting.service';
import { selectAuthenticatedUserIsAdmin } from '../../users/state/users.selectors';
import { MeetingState } from '../meeting-state.enum';
import { meetingStarted } from '../state/meetings.actions';
import { selectLiveMeeting } from '../state/meetings.selectors';

@Component({
  selector: 'app-next-meeting-card',
  templateUrl: './next-meeting-card.component.html',
  styleUrls: ['./next-meeting-card.component.css'],
})
export class NextMeetingCardComponent implements OnInit {
  @Input({ required: true }) meeting!: MeetingDto;
  myRecommendation$!: Observable<BookRecommendationDto | undefined>;
  liveMeeting$!: Observable<MeetingDto | null>;
  admin$: Observable<boolean>;
  MeetingState = MeetingState;

  constructor(
    private store: Store<AppState>,
    private liveMeetingSvc: LiveMeetingService
  ) {
    this.myRecommendation$ = store.select(selectMyRecommendations).pipe(
      tap(recommendations =>
        recommendations.filter(r => r.meeting.id === this.meeting.id)
      ),
      map(recommendations => recommendations[0])
    );

    this.admin$ = store.select(selectAuthenticatedUserIsAdmin);

    this.liveMeeting$ = store.select(selectLiveMeeting);
  }

  async ngOnInit() {
    if (!this.liveMeetingSvc.connected) {
      await this.liveMeetingSvc.start();
    }

    if (this.meeting.state) {
      this.store.dispatch(meetingStarted({ meeting: this.meeting }));
    }
  }

  startMeeting() {
    this.liveMeetingSvc.startMeeting(this.meeting.id);
  }
}
