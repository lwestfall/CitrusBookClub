import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { Observable, map } from 'rxjs';
import { BookDto, MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import { selectMyRecommendations } from '../../books/state/books.selectors';
import { LiveMeetingService } from '../../services/websockets/live-meeting.service';
import { selectAuthenticatedUserIsAdmin } from '../../users/state/users.selectors';
import { MeetingStatus } from '../meeting-status.enum';
import { deleteMeeting, updateMeeting } from '../state/meetings.actions';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.css'],
})
export class MeetingCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) meeting!: MeetingDto;
  @Input() recommendationDetails = true;
  myRecommendedBook$!: Observable<BookDto | undefined>;
  admin$: Observable<boolean>;
  MeetingState = MeetingStatus;
  withinStartWindow = false;
  startWindowCheckTimer: NodeJS.Timeout | undefined;
  newDateTime: Date | null = null;

  constructor(
    private store: Store<AppState>,
    private liveMeetingSvc: LiveMeetingService,
    private modalSvc: NgbModal
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

    if (!this.withinStartWindow && !this.meeting.status) {
      this.checkMeetingStartWindow();
      this.startWindowCheckTimer = setInterval(
        this.checkMeetingStartWindow.bind(this),
        2000
      );
    }

    this.newDateTime = new Date(this.meeting.dateTime);
  }

  ngOnDestroy(): void {
    if (this.startWindowCheckTimer) {
      clearInterval(this.startWindowCheckTimer!);
    }
  }

  checkMeetingStartWindow() {
    const now = moment();
    const start = moment(this.meeting.dateTime);

    if (now.isAfter(start.subtract(1, 'hour'))) {
      this.withinStartWindow = true;

      if (this.startWindowCheckTimer) {
        clearInterval(this.startWindowCheckTimer!);
      }
    }
  }

  startMeeting() {
    this.liveMeetingSvc.startMeeting(this.meeting.id);
  }

  showDeleteMeetingConfirmation(content: TemplateRef<Element>) {
    this.modalSvc.open(content).closed.subscribe(result => {
      if (result === 'confirm') {
        this.store.dispatch(deleteMeeting({ meetingId: this.meeting.id }));
      }
    });
  }

  showUpdateMeetingConfirmation(content: TemplateRef<Element>) {
    this.modalSvc.open(content).closed.subscribe(result => {
      if (result === 'update') {
        this.store.dispatch(
          updateMeeting({
            meetingId: this.meeting.id,
            dateTime: moment(this.newDateTime).toISOString(),
          })
        );
      }
    });
  }
}
