/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleBooksService } from './google-books.service';

describe('Service: GoogleBooks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleBooksService],
    });
  });

  it('should ...', inject(
    [GoogleBooksService],
    (service: GoogleBooksService) => {
      expect(service).toBeTruthy();
    }
  ));
});
