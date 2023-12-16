import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BookDto } from '../../api/models';
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
  books: BookDto[] = [];

  constructor(
    private booksService: BooksService,
    private toastsService: ToastsService
  ) {}

  ngOnInit() {
    this.fetchMyBooks();
  }

  fetchMyBooks() {
    this.booksService.getUsersBooks().subscribe({
      next: books => {
        this.books = books;
      },
      error: () => {
        this.toastsService.show({
          header: 'Ah, nuts!',
          body: 'Failed to fetch your books. Try again in a little bit.',
        });
      },
    });
  }
}
