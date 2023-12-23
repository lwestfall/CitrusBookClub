import { Component, Input } from '@angular/core';
import { BookDto } from '../../api/models';
import { BooksService } from '../../api/services';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input({ required: true }) book!: BookDto;
  @Input() mine = false;
  expanded = false;

  constructor(private booksService: BooksService) {}
  deleteBook() {
    // TODO
  }
}
