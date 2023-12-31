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
    await super.start();

    this.connection.on('MeetingStarted', (meeting: MeetingDto) => {
      console.log('Started meeting', meeting);
      this.store.dispatch(actions.meetingStarted({ meeting }));
    });

    this.connection.on('MeetingJoined', (meeting: MeetingDto) => {
      console.log('Joined meeting', meeting);
      this.store.dispatch(actions.joinedMeeting({ meeting }));
    });

    this.connection.on('MeetingLeft', (meetingId: string) => {
      console.log(`Left meeting ${meetingId}`);
      this.store.dispatch(actions.leftMeeting({ meetingId }));
    });

    this.connection.on('MeetingUnstarted', (meeting: string) => {
      console.log(`Unstarted meeting`, meeting);
      this.store.dispatch(actions.meetingUnstarted({ meeting }));
      // this.store.dispatch(actions.leftMeeting({ meeting }));
    });
  }

  async startMeeting(meetingId: string): Promise<void> {
    await this.connection.invoke('StartMeeting', meetingId);
  }

  async joinMeeting(meetingId: string): Promise<void> {
    await this.connection.invoke('JoinMeeting', meetingId);
  }

  async leaveMeeting(meetingId: string): Promise<void> {
    await this.connection.invoke('LeaveMeeting', meetingId);
  }

  async unstartMeeting(meetingId: string): Promise<void> {
    await this.connection.invoke('UnstartMeeting', meetingId);
  }
}
