import { Component, OnInit } from '@angular/core';
import { BookCreatorComponent } from '../book-creator/book-creator.component';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  imports: [BookCreatorComponent],
  styleUrls: ['./books-page.component.css'],
  standalone: true,
})
export class BooksPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
