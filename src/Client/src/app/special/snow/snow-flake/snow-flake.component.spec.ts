/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SnowFlakeComponent } from './snow-flake.component';

describe('SnowFlakeComponent', () => {
  let component: SnowFlakeComponent;
  let fixture: ComponentFixture<SnowFlakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowFlakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowFlakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
