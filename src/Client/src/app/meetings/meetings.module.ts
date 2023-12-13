import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MeetingCountdownComponent } from './meeting-countdown/meeting-countdown.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MeetingCountdownComponent],
  exports: [MeetingCountdownComponent],
})
export class MeetingsModule {}
