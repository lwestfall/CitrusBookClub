import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookAnonymousDto, BookDto } from '../../api/models';
import { AppState } from '../../app-state';
import * as bookSelectors from '../state/books.selectors';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css'],
})
export class BooksPageComponent {
  formCollapsed = true;
  myBooks$: Observable<BookDto[]>;
  // othersBooks$: Observable<BookAnonymousDto[]>;
  isLoadingMyBooks$: Observable<boolean>;
  // isLoadingOthersBooks$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isLoadingMyBooks$ = this.store.select(
      bookSelectors.selectIsLoadingMyBooks
    );

    // this.isLoadingOthersBooks$ = this.store.select(
    //   bookSelectors.selectIsLoadingOthersBooks
    // );

    this.myBooks$ = this.store.select(bookSelectors.selectMyBooks);
    // this.othersBooks$ = this.store.select(bookSelectors.selectOthersBooks);
  }

  httpToHttps(bookDto: BookDto | BookAnonymousDto) {
    bookDto.thumbnailLink = bookDto.thumbnailLink?.replace(/^http:/i, 'https:');
  }
}
