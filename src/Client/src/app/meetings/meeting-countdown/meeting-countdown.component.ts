import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { Observable } from 'rxjs';
import { MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import { selectNextMeeting } from '../state/meetings.selectors';

@Component({
  selector: 'app-meeting-countdown',
  templateUrl: './meeting-countdown.component.html',
  styleUrls: ['./meeting-countdown.component.css'],
})
export class MeetingCountdownComponent {
  nextMeeting$: Observable<MeetingDto | null>;
  nextMeetingStr?: string;

  constructor(store: Store<AppState>) {
    this.nextMeeting$ = store.select(selectNextMeeting);

    this.nextMeeting$.subscribe(nextMeeting => {
      this.nextMeetingStr = this.timeUntilMeeting(nextMeeting);

      setInterval(() => {
        this.nextMeetingStr = this.timeUntilMeeting(nextMeeting);
      }, 1000);
    });
  }

  timeUntilMeeting(meeting: MeetingDto | null): string {
    if (!meeting) {
      return '';
    }

    const now = moment();
    const meetingStart = moment(meeting.dateTime);
    const diffSecondsTotal = meetingStart.diff(now, 'seconds');
    const diffDays = Math.floor(diffSecondsTotal / 86400);
    const diffHours = Math.floor((diffSecondsTotal % 86400) / 3600);
    const diffMinutes = Math.floor(((diffSecondsTotal % 86400) % 3600) / 60);
    const diffSeconds = Math.floor(((diffSecondsTotal % 86400) % 3600) % 60);

    if (diffSecondsTotal >= -120 && diffSecondsTotal < 0) {
      // todo: currently this will never hit - next meeting returned is always in the future (or null)
      return 'Meeting in progress';
    }

    const timeUntilStrs = [];

    if (diffDays == 1) {
      timeUntilStrs.push(`${diffDays} day`);
    } else if (diffDays > 1) {
      timeUntilStrs.push(`${diffDays} days`);
    }

    if (diffHours == 1) {
      timeUntilStrs.push(`${diffHours} hour`);
    } else if (diffHours > 1) {
      timeUntilStrs.push(`${diffHours} hours`);
    }

    if (diffMinutes == 1) {
      timeUntilStrs.push(`${diffMinutes} minute`);
    } else if (diffMinutes > 1) {
      timeUntilStrs.push(`${diffMinutes} minutes`);
    }

    if (diffSeconds == 1) {
      timeUntilStrs.push(`${diffSeconds} second`);
    } else if (diffSecondsTotal > 1) {
      timeUntilStrs.push(`${diffSeconds} seconds`);
    }

    return `${timeUntilStrs.join(', ')}`;
  }
}
