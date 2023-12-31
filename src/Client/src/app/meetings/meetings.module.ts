import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BooksModule } from '../books/books.module';
import { LiveMeetingComponent } from './live-meeting/live-meeting.component';
import { MeetingCountdownComponent } from './meeting-countdown/meeting-countdown.component';
import { MeetingsPageComponent } from './meetings-page/meetings-page.component';
import { NextMeetingCardComponent } from './next-meeting-card/next-meeting-card.component';
import { MeetingsEffects } from './state/meetings.effects';
import { meetingsReducer } from './state/meetings.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('meetings', meetingsReducer),
    EffectsModule.forFeature([MeetingsEffects]),
    BooksModule,
  ],
  declarations: [
    MeetingCountdownComponent,
    MeetingsPageComponent,
    NextMeetingCardComponent,
    LiveMeetingComponent,
  ],
  exports: [MeetingCountdownComponent, NextMeetingCardComponent],
})
export class MeetingsModule {}
