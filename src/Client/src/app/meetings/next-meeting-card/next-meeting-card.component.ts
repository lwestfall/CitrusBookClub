import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { BookRecommendationDto, MeetingDto } from '../../api/models';
import { AppState } from '../../app-state';
import { selectMyRecommendations } from '../../books/state/books.selectors';

@Component({
  selector: 'app-next-meeting-card',
  templateUrl: './next-meeting-card.component.html',
  styleUrls: ['./next-meeting-card.component.css'],
})
export class NextMeetingCardComponent {
  @Input({ required: true }) meeting!: MeetingDto;
  myRecommendation$!: Observable<BookRecommendationDto | undefined>;

  constructor(store: Store<AppState>) {
    this.myRecommendation$ = store.select(selectMyRecommendations).pipe(
      tap(recommendations =>
        recommendations.filter(r => r.meeting.id === this.meeting.id)
      ),
      map(recommendations => recommendations[0])
    );
  }
}
