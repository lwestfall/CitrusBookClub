import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import { LiveMeetingService } from '../../services/websockets/live-meeting.service';
import { selectAuthenticatedUserIsAdmin } from '../../users/state/users.selectors';
import {
  selectIsLoadingAllMeetings,
  selectLastMeeting,
  selectNextMeeting,
  selectPastMeetings,
} from '../state/meetings.selectors';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.css'],
})
export class MeetingsPageComponent implements OnDestroy {
  meetingNow = false;
  nextMeeting$ = this.store.select(selectNextMeeting);
  lastMeeting$ = this.store.select(selectLastMeeting);
  pastMeetings$ = this.store.select(selectPastMeetings);
  isLoadingMeetings$ = this.store.select(selectIsLoadingAllMeetings);
  admin$ = this.store.select(selectAuthenticatedUserIsAdmin);

  lastMeeting: MeetingDto | null = null;
  lastMeetingSubscription: Subscription;
  newMeetingDateTime: Date | null = null;

  constructor(
    private store: Store<AppState>,
    private liveMeetingSvc: LiveMeetingService,
    private modalSvc: NgbModal
  ) {
    this.lastMeetingSubscription = this.lastMeeting$.subscribe(m => {
      this.lastMeeting = m;
    });
  }

  ngOnDestroy(): void {
    this.lastMeetingSubscription.unsubscribe();
  }

  showCreateMeetingModal(content: TemplateRef<Element>) {
    this.modalSvc.open(content).closed.subscribe(() => {
      this.liveMeetingSvc.createNextMeeting({
        dateTime: moment(this.newMeetingDateTime).toISOString(),
        previousMeetingId: this.lastMeeting?.id,
      });
    });
  }
}
