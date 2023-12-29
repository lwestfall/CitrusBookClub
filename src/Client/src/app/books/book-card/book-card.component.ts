import { Component, Input } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BookDto } from '../../api/models';
import { AppState } from '../../app-state';
import { ToastsService } from '../../services/toasts.service';
import { deleteBook, deleteBookSuccess } from '../state/books.actions';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input({ required: true }) book!: BookDto;
  @Input() mine = false;
  expanded = false;

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private toastService: ToastsService
  ) {}

  deleteBook() {
    this.store.dispatch(deleteBook({ bookId: this.book.id! }));

    this.actions$.pipe(ofType(deleteBookSuccess)).subscribe(() => {
      this.toastService.showSuccess('Book deleted');
    });
  }
}
