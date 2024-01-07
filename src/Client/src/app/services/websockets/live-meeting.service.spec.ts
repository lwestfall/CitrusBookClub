/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LiveMeetingService } from './live-meeting.service';

describe('Service: LiveMeeting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveMeetingService]
    });
  });

  it('should ...', inject([LiveMeetingService], (service: LiveMeetingService) => {
    expect(service).toBeTruthy();
  }));
});
