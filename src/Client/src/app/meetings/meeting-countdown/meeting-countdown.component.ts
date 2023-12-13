import { Component, OnInit } from '@angular/core';
import { MeetingSimpleDto } from '../../api/models';
import { MeetingsService } from '../../api/services';

@Component({
  selector: 'meeting-countdown',
  templateUrl: './meeting-countdown.component.html',
  styleUrls: ['./meeting-countdown.component.css'],
})
export class MeetingCountdownComponent implements OnInit {
  nextMeeting?: MeetingSimpleDto;

  constructor(private mtgSvc: MeetingsService) {}

  ngOnInit() {
    this.mtgSvc
      .getNextMeeting()
      .subscribe({ next: mtg => (this.nextMeeting = mtg) });
  }
}
