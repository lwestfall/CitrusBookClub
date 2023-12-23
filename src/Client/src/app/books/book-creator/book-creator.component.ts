import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BookDto, CreateBookDto } from '../../api/models';
import { BooksService } from '../../api/services';
import {
  GoogleBookVolumeInfo,
  GoogleBooksService,
} from '../../services/google-books.service';
import { ToastsService } from '../../services/toasts.service';

@Component({
  selector: 'app-book-creator',
  templateUrl: './book-creator.component.html',
  styleUrls: ['./book-creator.component.css'],
})
export class BookCreatorComponent implements OnInit {
  @Output() bookCreated = new EventEmitter<BookDto>();
  suggestions: BookDto[] = [];
  suppressSuggestions = false;
  suggestionsCollapsed = true;
  bookForm = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
    ],
    author: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
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
  suggestionClicked = false;

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

      if (this.suggestionClicked) {
        return;
      }

      this.searchIsbn(isbn);
    });

    this.bookForm.get('thumbnailLink')?.valueChanges.subscribe(url => {
      this.checkThumbnailUrl(url);
    });

    this.bookForm
      .get('title')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        if (this.suggestionClicked) {
          return;
        }

        this.fetchSuggestions();
      });

    this.bookForm
      .get('author')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        if (this.suggestionClicked) {
          return;
        }

        this.fetchSuggestions();
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

  async fetchSuggestions(): Promise<void> {
    const title = this.bookForm.get('title')?.value;
    const author = this.bookForm.get('author')?.value;

    if (!title && !author) {
      this.suggestions = [];
      this.suggestionsCollapsed = true;
      return;
    }

    try {
      const volumes = await this.googleBooksSvc.getBookVolumeFuzzy(
        title,
        author,
        5
      );

      this.suggestions = volumes.map(volume =>
        this.volumeInfoToDto(volume.volumeInfo)
      );
    } catch (err) {
      console.error(err);
    }

    if (!this.suppressSuggestions) {
      this.suggestionsCollapsed = this.suggestions.length === 0;
    }
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
      next: book => {
        this.clear();
        this.toastsService.show({
          classname: 'text-bg-success text-light',
          header: 'Book Created!',
        });
        this.bookCreated.emit(book);
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

  fillFromSuggestion(suggestion: BookDto) {
    this.suggestionClicked = true;
    this.bookForm.patchValue({
      title: suggestion.title,
      author: suggestion.author,
      description: suggestion.description ?? '',
      isbn: suggestion.isbn ?? '',
      pageCount: suggestion.pageCount ?? 0,
      thumbnailLink: suggestion.thumbnailLink ?? '',
    });
    this.bookForm.markAllAsTouched();
    this.suggestionsCollapsed = true;
  }

  clear() {
    this.suppressSuggestions = false;
    this.suggestionClicked = false;
    this.bookForm.reset();
  }

  volumeInfoToDto(volume: GoogleBookVolumeInfo): BookDto {
    return {
      title: volume.title,
      author: volume.authors?.join(', '),
      isbn: this.getBestIsbn(volume),
      description: volume.description,
      pageCount: volume.pageCount,
      thumbnailLink: volume.imageLinks?.smallThumbnail.replace(
        /^http:/i,
        'https:'
      ),
    };
  }

  getBestIsbn(volume: GoogleBookVolumeInfo): string | null {
    if (!volume.industryIdentifiers) {
      return null;
    }

    const isbn = volume.industryIdentifiers.find(
      id => id.type === 'ISBN_13' || id.type === 'ISBN_10'
    );

    if (!isbn) {
      return null;
    }

    return isbn.identifier;
  }
}
