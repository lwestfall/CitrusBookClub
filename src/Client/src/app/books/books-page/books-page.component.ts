/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookAnonymousDto, BookDto } from '../../api/models';
import { AppState } from '../../app-state';
import * as bookActions from '../state/books.actions';
import * as bookSelectors from '../state/books.selectors';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css'],
})
export class BooksPageComponent implements OnInit {
  formCollapsed = true;
  myBooks$: Observable<BookDto[]>;
  othersBooks$: Observable<BookAnonymousDto[]>;
  isLoadingMyBooks$: Observable<boolean>;
  isLoadingOthersBooks$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isLoadingMyBooks$ = this.store.select(
      bookSelectors.selectIsLoadingMyBooks
    );

    this.isLoadingOthersBooks$ = this.store.select(
      bookSelectors.selectIsLoadingOthersBooks
    );

    this.myBooks$ = this.store.select(bookSelectors.selectMyBooks);
    this.othersBooks$ = this.store.select(bookSelectors.selectOthersBooks);
  }

  ngOnInit() {
    this.store.dispatch(bookActions.getMyBooks());
    this.store.dispatch(bookActions.getOthersBooks());
  }

  httpToHttps(bookDto: BookDto | BookAnonymousDto) {
    bookDto.thumbnailLink = bookDto.thumbnailLink?.replace(/^http:/i, 'https:');
  }
}
