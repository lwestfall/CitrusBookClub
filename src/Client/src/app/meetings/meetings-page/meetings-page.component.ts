import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { MeetingDto } from '../../api/models';
import { MeetingsService } from '../../api/services';

@Component({
  selector: 'app-meetings-page',
  templateUrl: './meetings-page.component.html',
  styleUrls: ['./meetings-page.component.css'],
  standalone: true,
})
export class MeetingsPageComponent implements OnInit {
  meetingNow = false;
  nextMeeting: MeetingDto | null = null;

  constructor(private meetingsService: MeetingsService) {}

  ngOnInit() {
    this.meetingsService.getNextMeeting().subscribe({
      next: meeting => {
        this.nextMeeting = meeting;

        const now = moment();
        const start = moment(meeting.dateTime);
        const diff = start.diff(now, 'seconds');

        if (diff > 0 && diff < 60 * 60 * 2) {
          this.meetingNow = true;
        }
      },
    });
  }
}
