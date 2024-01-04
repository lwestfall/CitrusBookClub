import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
import { MeetingDto } from '../../api/models';

@Component({
  selector: 'app-meeting-countdown',
  templateUrl: './meeting-countdown.component.html',
  styleUrls: ['./meeting-countdown.component.css'],
})
export class MeetingCountdownComponent implements OnInit, OnDestroy {
  @Input({ required: true }) meeting!: MeetingDto;
  nextMeetingStr?: string;
  timeUntilMeetingInterval?: NodeJS.Timeout;

  constructor() {}

  ngOnInit(): void {
    this.nextMeetingStr = this.timeUntilMeeting();

    this.timeUntilMeetingInterval = setInterval(() => {
      this.nextMeetingStr = this.timeUntilMeeting();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeUntilMeetingInterval);
  }

  timeUntilMeeting(): string {
    if (this.meeting.status) {
      throw new Error("Can't countdown to a meeting that has started!");
    }

    const now = moment();
    const meetingStart = moment(this.meeting.dateTime);
    const diffSecondsTotal = meetingStart.diff(now, 'seconds');
    const diffDays = Math.floor(diffSecondsTotal / 86400);
    const diffHours = Math.floor((diffSecondsTotal % 86400) / 3600);
    const diffMinutes = Math.floor(((diffSecondsTotal % 86400) % 3600) / 60);
    const diffSeconds = Math.floor(((diffSecondsTotal % 86400) % 3600) % 60);

    if (diffSecondsTotal >= -120 && diffSecondsTotal < 0) {
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
