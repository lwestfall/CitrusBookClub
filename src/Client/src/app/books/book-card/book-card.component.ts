import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BookDto } from '../../api/models';
import { AppState } from '../../app-state';
import { ToastsService } from '../../services/toasts.service';
import {
  deleteBook,
  deleteBookSuccess,
  recommendBookForMeeting,
} from '../state/books.actions';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) book!: BookDto;
  @Input() recommendedForNext = false;
  @Input() mine = false;
  @Input() ripple = false;
  @Input() nextMeetingId: string | null = null;

  expanded = false;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.actions$.pipe(ofType(deleteBookSuccess)).subscribe(action => {
        if (action.bookId === this.book.id) {
          this.toastService.showSuccess('Book deleted');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  deleteBook(): void {
    this.store.dispatch(deleteBook({ bookId: this.book.id! }));
  }

  recommendForNext(): void {
    if (!this.nextMeetingId) {
      return;
    }

    this.store.dispatch(
      recommendBookForMeeting({
        bookId: this.book.id!,
        meetingId: this.nextMeetingId,
      })
    );
  }
}
