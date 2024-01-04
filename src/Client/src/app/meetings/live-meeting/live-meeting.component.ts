import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BookDto, MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import { LiveMeetingService } from '../../services/websockets/live-meeting.service';
import { selectAuthenticatedUserIsAdmin } from '../../users/state/users.selectors';
import { MeetingStatus } from '../meeting-status.enum';
import { handleMeetingUpdate } from '../state/meetings.actions';
import { MeetingState } from '../state/meetings.reducer';
import { selectMeetingState } from '../state/meetings.selectors';

@Component({
  selector: 'app-live-meeting',
  templateUrl: './live-meeting.component.html',
  styleUrls: ['./live-meeting.component.css'],
})
export class LiveMeetingComponent implements OnInit, OnDestroy {
  meetingId: string | null = null;
  meetingState$: Observable<MeetingState | null> | null = null;
  lastBook: BookDto | null = null;
  MeetingState = MeetingStatus;

  isAdmin: boolean = false;
  presenterMode: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private liveMeetingSvc: LiveMeetingService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.meetingId = params.get('id') ?? '';
        this.presenterMode = params.get('presenterMode') === 'true';

        this.meetingState$ = this.store.select(
          selectMeetingState({ meetingId: this.meetingId })
        );
      })
    );

    const admin$ = this.store.select(selectAuthenticatedUserIsAdmin);

    this.subscriptions.push(
      admin$.subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      })
    );
  }

  async ngOnInit() {
    if (!this.meetingId) {
      throw new Error('No meeting ID provided');
    }

    await this.liveMeetingSvc.start();

    if (this.presenterMode && this.meetingId) {
      this.liveMeetingSvc.registerAsPresenter(
        this.meetingId,
        (meeting: MeetingDto) => this.announceWinner(meeting)
      );
    } else {
      this.liveMeetingSvc.joinMeeting(this.meetingId);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
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

  togglePresenterMode() {
    this.presenterMode = !this.presenterMode;
  }

  announceWinner(meeting: MeetingDto) {
    console.log('Winner announced', meeting.winningBook?.title);
    this.store.dispatch(handleMeetingUpdate({ meeting }));
  }
}
