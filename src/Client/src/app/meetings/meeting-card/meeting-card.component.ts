import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { BookRecommendationDto, MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import { selectMyRecommendations } from '../../books/state/books.selectors';
import { LiveMeetingService } from '../../services/websockets/live-meeting.service';
import { selectAuthenticatedUserIsAdmin } from '../../users/state/users.selectors';
import { MeetingStatus } from '../meeting-status.enum';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.css'],
})
export class MeetingCardComponent {
  @Input({ required: true }) meeting!: MeetingDto;
  myRecommendation$!: Observable<BookRecommendationDto | undefined>;
  admin$: Observable<boolean>;
  MeetingState = MeetingStatus;

  constructor(
    store: Store<AppState>,
    private liveMeetingSvc: LiveMeetingService
  ) {
    this.myRecommendation$ = store.select(selectMyRecommendations).pipe(
      tap(recommendations =>
        recommendations.filter(r => r.meeting.id === this.meeting.id)
      ),
      map(recommendations => recommendations[0])
    );

    this.admin$ = store.select(selectAuthenticatedUserIsAdmin);
  }

  startMeeting() {
    this.liveMeetingSvc.startMeeting(this.meeting.id);
  }
}
