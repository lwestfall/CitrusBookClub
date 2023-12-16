import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateBookDto } from '../../api/models';
import { BooksService } from '../../api/services';
import { GoogleBooksService } from '../../services/google-books.service';
import { ToastsService } from '../../services/toasts.service';

@Component({
  selector: 'app-book-creator',
  templateUrl: './book-creator.component.html',
  styleUrls: ['./book-creator.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class BookCreatorComponent implements OnInit {
  bookForm = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
    ],
    author: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    description: ['', [Validators.maxLength(1500)]],
    isbn: ['', [Validators.maxLength(20)]],
    pageCount: [0],
    thumbnailLink: ['', [Validators.maxLength(1000)]],
  });

  validUrl: string | null = null;
  isbnChangedByHandler = false;

  createPending = false;
  isbnSearchPending = false;

  constructor(
    private booksService: BooksService,
    private googleBooksSvc: GoogleBooksService,
    private toastsService: ToastsService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit() {
    this.bookForm.get('isbn')?.valueChanges.subscribe(isbn => {
      if (this.isbnChangedByHandler) {
        this.isbnChangedByHandler = false;
        return;
      }

      this.searchIsbn(isbn);
    });

    this.bookForm.get('thumbnailLink')?.valueChanges.subscribe(url => {
      this.checkThumbnailUrl(url);
    });
  }

  async searchIsbn(isbn: string | null) {
    if (!isbn || isbn.length < 10) {
      return;
    }

    isbn = isbn.replace(/{\D}|-|\./g, '');

    this.isbnSearchPending = true;

    try {
      const volume = await this.googleBooksSvc.getBookVolumeByIsbn(isbn);

      if (!volume) {
        return;
      }

      this.isbnChangedByHandler = true;

      this.bookForm.patchValue({
        isbn: isbn,
        title: volume.volumeInfo.title,
        author: volume.volumeInfo.authors.join(', '),
        description: volume.volumeInfo.description,
        pageCount: volume.volumeInfo.pageCount,
        thumbnailLink: volume.volumeInfo.imageLinks?.smallThumbnail,
      });

      this.bookForm.markAllAsTouched();
    } catch (err) {
      console.error(err);
      // TODO: show error
    }

    this.isbnSearchPending = false;
  }

  checkThumbnailUrl(url: string | null) {
    if (!url) {
      this.validUrl = null;
      return;
    }

    this.validUrl = url.replace(/^http:/i, 'https:');
  }

  save() {
    const body = this.bookForm.value as CreateBookDto;
    this.createPending = true;
    this.bookForm.disable();
    this.booksService.createBook({ body }).subscribe({
      next: () => {
        this.clear();
        this.toastsService.show({
          classname: 'text-bg-success text-light',
          header: 'Book Created!',
        });
      },
      error: err => {
        console.error(err);
        this.toastsService.show({
          header: 'Uh oh!',
          body: 'There was an error creating the book, please try again.',
        });
      },
      complete: () => {
        this.createPending = false;
        this.bookForm.enable();
      },
    });
  }

  clear() {
    this.bookForm.reset();
  }
}
