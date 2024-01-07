import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import {
  BookAnonymousDto,
  BookDto,
  BookRecommendationDto,
  MeetingDto,
} from '../../api/models';
import { AppState } from '../../app-state';
import { selectNextMeeting } from '../../meetings/state/meetings.selectors';
import * as bookSelectors from '../state/books.selectors';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css'],
})
export class BooksPageComponent implements OnDestroy {
  formCollapsed = true;
  myBooks$: Observable<BookDto[]>;
  nextMeeting$: Observable<MeetingDto | null>;
  myRecommendations$: Observable<BookRecommendationDto[]>;
  isLoadingMyBooks$: Observable<boolean>;

  nextRecommendedBookId?: string;

  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>) {
    this.isLoadingMyBooks$ = this.store.select(
      bookSelectors.selectIsLoadingMyBooks
    );

    this.myBooks$ = this.store.select(bookSelectors.selectMyBooks);

    this.nextMeeting$ = this.store.select(selectNextMeeting);

    this.myRecommendations$ = this.store.select(
      bookSelectors.selectMyRecommendations
    );

    combineLatest([this.nextMeeting$, this.myRecommendations$]).subscribe(
      ([nextMeeting, myRecommendations]) => {
        if (!nextMeeting) {
          return;
        }

        const nextRecommendation = myRecommendations.find(
          r => r.meeting.id === nextMeeting.id
        );

        if (nextRecommendation) {
          this.nextRecommendedBookId = nextRecommendation.book.id;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  httpToHttps(bookDto: BookDto | BookAnonymousDto) {
    bookDto.thumbnailLink = bookDto.thumbnailLink?.replace(/^http:/i, 'https:');
  }
}
