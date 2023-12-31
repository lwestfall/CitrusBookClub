import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookDto, MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import { LiveMeetingService } from '../../services/websockets/live-meeting.service';
import { selectAuthenticatedUserIsAdmin } from '../../users/state/users.selectors';
import { MeetingState } from '../meeting-state.enum';
import { selectLiveMeeting } from '../state/meetings.selectors';

@Component({
  selector: 'app-live-meeting',
  templateUrl: './live-meeting.component.html',
  styleUrls: ['./live-meeting.component.css'],
})
export class LiveMeetingComponent implements OnInit, OnDestroy {
  meetingId: string | null = null;
  meeting$: Observable<MeetingDto | null>;
  lastBook: BookDto | null = null;
  MeetingState = MeetingState;
  admin$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private liveMeetingSvc: LiveMeetingService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.meetingId = params.get('id') ?? '';
    });

    this.meeting$ = this.store.select(selectLiveMeeting);

    this.admin$ = this.store.select(selectAuthenticatedUserIsAdmin);
  }

  async ngOnInit() {
    if (!this.meetingId) {
      throw new Error('No meeting ID provided');
    }

    await this.liveMeetingSvc.start();
    this.liveMeetingSvc.joinMeeting(this.meetingId);

    this.meeting$.subscribe(meeting => {
      this.lastBook = meeting?.previousMeeting?.winningBook ?? null;
    });
  }

  ngOnDestroy(): void {
    if (!this.meetingId) {
      return;
    }

    this.liveMeetingSvc.leaveMeeting(this.meetingId);
  }

  startMeeting() {
    if (!this.meetingId) {
      return;
    }

    this.liveMeetingSvc.startMeeting(this.meetingId);
  }

  lockInRecommendations() {
    if (!this.meetingId) {
      return;
    }

    this.liveMeetingSvc.startVoting(this.meetingId);
  }

  lockInVotes() {
    if (!this.meetingId) {
      return;
    }

    this.liveMeetingSvc.closeMeeting(this.meetingId);
  }

  resetMeeting() {
    if (!this.meetingId) {
      return;
    }

    this.liveMeetingSvc.resetMeeting(this.meetingId);
  }
}
