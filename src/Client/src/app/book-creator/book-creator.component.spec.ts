/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookCreatorComponent } from './book-creator.component';

describe('BookCreatorComponent', () => {
  let component: BookCreatorComponent;
  let fixture: ComponentFixture<BookCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCreatorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
