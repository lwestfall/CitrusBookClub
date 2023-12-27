import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MeetingCountdownComponent } from './meeting-countdown/meeting-countdown.component';
import { MeetingsPageComponent } from './meetings-page/meetings-page.component';
import { NextMeetingCardComponent } from './next-meeting-card/next-meeting-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MeetingCountdownComponent,
    MeetingsPageComponent,
    NextMeetingCardComponent,
  ],
  exports: [MeetingCountdownComponent],
})
export class MeetingsModule {}
