import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { MeetingDto } from '../../api/models';
import { MeetingsService } from '../../api/services';

@Component({
  selector: 'app-meeting-countdown',
  templateUrl: './meeting-countdown.component.html',
  styleUrls: ['./meeting-countdown.component.css'],
})
export class MeetingCountdownComponent implements OnInit {
  nextMeeting?: MeetingDto;
  nextMeetingStr?: string;

  constructor(private mtgSvc: MeetingsService) {}

  ngOnInit() {
    this.mtgSvc
      .getNextMeeting()
      .subscribe({ next: mtg => (this.nextMeeting = mtg) });

    setInterval(() => {
      this.nextMeetingStr = this.timeUntilNextMeeting();
    }, 1000);
  }

  timeUntilNextMeeting(): string {
    if (!this.nextMeeting) {
      return '';
    }

    const now = moment();
    const meetingStart = moment(this.nextMeeting.dateTime);
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

    return `Next meeting in ${timeUntilStrs.join(', ')}!`;
  }
}
