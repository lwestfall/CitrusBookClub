import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { orderBy } from 'lodash-es';
import { Subscription } from 'rxjs';
import { BookDto, MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import { selectNextMeeting } from '../../meetings/state/meetings.selectors';
import { ToastsService } from '../../services/toasts.service';
import {
  deleteBook,
  deleteBookSuccess,
  recommendBookForMeeting,
} from '../state/books.actions';
import { selectMyRecommendations } from '../state/books.selectors';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) book!: BookDto;
  recommendedForMeeting: MeetingDto | null = null;
  @Input() mine = false;
  @Input() noRipple = true;

  nextMeetingId: string | null = null;

  expanded = false;
  recommendedForNext = false;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private toastService: ToastsService
  ) {
    const nextMeeting$ = this.store.select(selectNextMeeting);

    this.subscriptions.push(
      nextMeeting$.subscribe(meeting => {
        this.nextMeetingId = meeting?.id ?? null;
        this.setRecommendedForNext();
      })
    );

    this.subscriptions.push(
      this.actions$.pipe(ofType(deleteBookSuccess)).subscribe(action => {
        if (action.bookId === this.book.id) {
          this.toastService.showSuccess('Book deleted');
        }
      })
    );
  }

  ngOnInit(): void {
    const recommendations$ = this.store.select(selectMyRecommendations);

    this.subscriptions.push(
      recommendations$.subscribe(recommendations => {
        const thisBookRecommendations = orderBy(
          recommendations.filter(r => r.book.id === this.book.id),
          r => r.meeting.dateTime
        );

        if (thisBookRecommendations.length > 0) {
          this.recommendedForMeeting = thisBookRecommendations[0].meeting;
        } else {
          this.recommendedForMeeting = null;
        }

        this.setRecommendedForNext();
      })
    );
  }

  setRecommendedForNext(): void {
    this.recommendedForNext =
      (!!this.nextMeetingId &&
        this.recommendedForMeeting?.id === this.nextMeetingId) ??
      false;
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
