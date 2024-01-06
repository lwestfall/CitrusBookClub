import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { BookDto, MeetingDto } from '../../api/models';
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
export class MeetingCardComponent implements OnInit {
  @Input({ required: true }) meeting!: MeetingDto;
  myRecommendedBook$!: Observable<BookDto | undefined>;
  admin$: Observable<boolean>;
  MeetingState = MeetingStatus;

  constructor(
    private store: Store<AppState>,
    private liveMeetingSvc: LiveMeetingService
  ) {
    this.admin$ = store.select(selectAuthenticatedUserIsAdmin);
  }

  ngOnInit(): void {
    this.myRecommendedBook$ = this.store
      .select(selectMyRecommendations)
      .pipe(
        map(
          recommendations =>
            recommendations
              .filter(r => r.meeting.id === this.meeting.id)
              .find(m => m)?.book
        )
      );
  }

  startMeeting() {
    this.liveMeetingSvc.startMeeting(this.meeting.id);
  }
}
