import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { QRCodeModule } from 'angularx-qrcode';
import { DndModule } from 'ngx-drag-drop';
import { BooksModule } from '../books/books.module';
import { LiveMeetingComponent } from './live-meeting/live-meeting.component';
import { LiveVotingComponent } from './live-meeting/live-voting/live-voting.component';
import { MeetingRecommendationsComponent } from './live-meeting/meeting-recommendations/meeting-recommendations.component';
import { MeetingCardComponent } from './meeting-card/meeting-card.component';
import { MeetingCountdownComponent } from './meeting-countdown/meeting-countdown.component';
import { MeetingsPageComponent } from './meetings-page/meetings-page.component';
import { MeetingsEffects } from './state/meetings.effects';
import { meetingsReducer } from './state/meetings.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('meetings', meetingsReducer),
    EffectsModule.forFeature([MeetingsEffects]),
    BooksModule,
    DndModule,
    QRCodeModule,
  ],
  declarations: [
    MeetingCountdownComponent,
    MeetingsPageComponent,
    MeetingCardComponent,
    MeetingRecommendationsComponent,
    LiveMeetingComponent,
    LiveVotingComponent,
  ],
  exports: [MeetingCountdownComponent, MeetingCardComponent],
})
export class MeetingsModule {}
