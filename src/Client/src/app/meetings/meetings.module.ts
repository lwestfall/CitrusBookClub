import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MeetingCountdownComponent } from './meeting-countdown/meeting-countdown.component';
import { MeetingsPageComponent } from './meetings-page/meetings-page.component';
import { NextMeetingCardComponent } from './next-meeting-card/next-meeting-card.component';
import { MeetingsEffects } from './state/meetings.effects';
import { meetingsReducer } from './state/meetings.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('meetings', meetingsReducer),
    EffectsModule.forFeature([MeetingsEffects]),
  ],
  declarations: [
    MeetingCountdownComponent,
    MeetingsPageComponent,
    NextMeetingCardComponent,
  ],
  exports: [MeetingCountdownComponent, NextMeetingCardComponent],
})
export class MeetingsModule {}
