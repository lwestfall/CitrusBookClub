import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BookDto } from '../../api/models';
import { BooksService } from '../../api/services';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
  imports: [CommonModule, NgbCollapseModule],
  standalone: true,
})
export class BookCardComponent implements OnInit {
  @Input({ required: true }) book!: BookDto;
  expanded = false;

  constructor(private booksService: BooksService) {}

  ngOnInit() {}

  deleteBook() {
    // TODO
  }
}
