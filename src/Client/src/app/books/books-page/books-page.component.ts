import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import { BookAnonymousDto, BookDto } from '../../api/models';
import { BooksService } from '../../api/services';
import { ToastsService } from '../../services/toasts.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookCreatorComponent } from '../book-creator/book-creator.component';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  imports: [
    BookCreatorComponent,
    BookCardComponent,
    CommonModule,
    NgbCollapseModule,
  ],
  styleUrls: ['./books-page.component.css'],
  standalone: true,
})
export class BooksPageComponent implements OnInit {
  formCollapsed = true;
  myBooks: BookDto[] = [];
  otherBooks: BookAnonymousDto[] = [];

  constructor(
    private booksService: BooksService,
    private toastsService: ToastsService
  ) {}

  ngOnInit() {
    this.fetchMyBooks();
    this.fetchOthersBooks();
  }

  fetchMyBooks() {
    this.booksService.getUsersBooks().subscribe({
      next: books => {
        this.myBooks.forEach(this.httpToHttps);
        this.myBooks = _.sortBy(books, b => b.title);
      },
      error: () => {
        this.toastsService.show({
          header: 'Ah, nuts!',
          body: 'Failed to fetch your books. Try again in a little bit.',
        });
      },
    });
  }

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
