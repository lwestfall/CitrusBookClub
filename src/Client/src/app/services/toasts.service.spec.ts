/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToastsService } from './toasts.service';

describe('Service: Toasts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastsService],
    });
  });

  it('should ...', inject([ToastsService], (service: ToastsService) => {
    expect(service).toBeTruthy();
  }));
});
