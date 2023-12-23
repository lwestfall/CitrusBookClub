import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import _ from 'lodash';
import { Observable } from 'rxjs';
import { BookAnonymousDto, BookDto } from '../../api/models';
import { BooksService } from '../../api/services';
import { AppState } from '../../app-state';
import { ToastsService } from '../../services/toasts.service';
import { getMyBooks } from '../state/books.actions';
import * as bookSelectors from '../state/books.selectors';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css'],
})
export class BooksPageComponent implements OnInit {
  formCollapsed = true;
  myBooks$: Observable<BookDto[]>;
  otherBooks: BookAnonymousDto[] = [];
  isLoadingMyBooks$: Observable<boolean>;

  constructor(
    private booksService: BooksService,
    private store: Store<AppState>,
    private toastsService: ToastsService
  ) {
    this.isLoadingMyBooks$ = this.store.select(
      bookSelectors.selectIsLoadingMyBooks
    );
    this.myBooks$ = this.store.select(bookSelectors.selectMyBooks);
  }

  ngOnInit() {
    this.store.dispatch(getMyBooks());
    // this.fetchMyBooks();
    this.fetchOthersBooks();
  }

  // fetchMyBooks() {
  //   this.booksService.getUsersBooks().subscribe({
  //     next: books => {
  //       this.myBooks.forEach(this.httpToHttps);
  //       this.myBooks = _.sortBy(books, b => b.title);
  //     },
  //     error: () => {
  //       this.toastsService.show({
  //         header: 'Ah, nuts!',
  //         body: 'Failed to fetch your books. Try again in a little bit.',
  //       });
  //     },
  //   });
  // }

  fetchOthersBooks() {
    this.booksService.getOthersBooks().subscribe({
      next: books => {
        // todo: this returns all books, including ours. we should filter those out (but can't because they're anonymous)
        this.otherBooks.forEach(this.httpToHttps);
        this.otherBooks = _.sortBy(books, b => b.title);
      },
      error: () => {
        this.toastsService.show({
          header: 'Ah, nuts!',
          body: "Failed to fetch others' books. Try again in a little bit.",
        });
      },
    });
  }

  httpToHttps(bookDto: BookDto | BookAnonymousDto) {
    bookDto.thumbnailLink = bookDto.thumbnailLink?.replace(/^http:/i, 'https:');
  }
}
