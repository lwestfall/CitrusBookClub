import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import * as actions from '../../meetings/state/meetings.actions';
import { SignalRService } from './signal-r.service';
import { WebsocketConfiguration } from './websocket-configuration';

@Injectable({
  providedIn: 'root',
})
export class LiveMeetingService extends SignalRService {
  constructor(
    config: WebsocketConfiguration,
    private store: Store<AppState>
  ) {
    super(config, 'livemeeting');
  }

  get connected(): boolean {
    return this.connection.state === 'Connected';
  }

  override async start(): Promise<void> {
    if (this.connected) {
      return;
    }

    await super.start();

    this.connection.on('MeetingStarted', (meeting: MeetingDto) => {
      this.store.dispatch(actions.meetingStarted({ meeting }));
    });

    this.connection.on('MeetingUpdate', (meeting: MeetingDto) => {
      this.store.dispatch(actions.liveMeetingUpdate({ meeting }));
    });

    this.connection.on('Error', (error: string) => {
      console.error('SignalR Error', error);
      this.store.dispatch(actions.liveMeetingError({ error }));
    });
  }

  async startMeeting(meetingId: string): Promise<void> {
    await this.connection.invoke('StartMeeting', meetingId);
  }

  async startVoting(meetingId: string): Promise<void> {
    await this.connection.invoke('StartVoting', meetingId);
  }

  async closeMeeting(meetingId: string): Promise<void> {
    await this.connection.invoke('CloseMeeting', meetingId);
  }

  async joinMeeting(meetingId: string): Promise<void> {
    await this.connection.invoke('JoinMeeting', meetingId);
  }

  async leaveMeeting(meetingId: string): Promise<void> {
    await this.connection.invoke('LeaveMeeting', meetingId);
    this.store.dispatch(actions.leftMeeting({ meetingId }));
  }

  async resetMeeting(meetingId: string): Promise<void> {
    await this.connection.invoke('ResetMeeting', meetingId);
  }
}
