/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCountdownComponent } from './meeting-countdown.component';

describe('MeetingCountdownComponent', () => {
  let component: MeetingCountdownComponent;
  let fixture: ComponentFixture<MeetingCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingCountdownComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
