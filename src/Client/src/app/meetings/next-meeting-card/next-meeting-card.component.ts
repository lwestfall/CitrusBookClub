import { Component, Input } from '@angular/core';
import { MeetingDto } from '../../api/models';

@Component({
  selector: 'app-next-meeting-card',
  templateUrl: './next-meeting-card.component.html',
  styleUrls: ['./next-meeting-card.component.css'],
})
export class NextMeetingCardComponent {
  @Input({ required: true }) meeting!: MeetingDto;

  constructor() {}
}
