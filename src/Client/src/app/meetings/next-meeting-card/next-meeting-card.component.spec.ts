/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NextMeetingCardComponent } from './next-meeting-card.component';

describe('NextMeetingCardComponent', () => {
  let component: NextMeetingCardComponent;
  let fixture: ComponentFixture<NextMeetingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NextMeetingCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextMeetingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
