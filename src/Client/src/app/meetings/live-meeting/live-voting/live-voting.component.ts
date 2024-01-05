import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { shuffle } from 'lodash-es';
import { DndDropEvent } from 'ngx-drag-drop';
import { Subscription } from 'rxjs';
import {
  BookDto,
  BookRecommendationForMeetingDto,
  CreateBookVoteDto,
  UserSimpleDto,
} from '../../../api/models';
import { AppState } from '../../../app-state';
import { LiveMeetingService } from '../../../services/websockets/live-meeting.service';
import { selectAuthenticatedUser } from '../../../users/state/users.selectors';

@Component({
  selector: 'app-live-voting',
  templateUrl: './live-voting.component.html',
  styleUrls: ['./live-voting.component.css'],
})
export class LiveVotingComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  recommendations!: BookRecommendationForMeetingDto[];
  @Input({ required: true }) meetingId!: string;

  rankedRecommendations: RankedBook[] = [];
  votesConfirmed: boolean = false;

  userSubscription?: Subscription;

  constructor(
    private store: Store<AppState>,
    private liveMeetingSvc: LiveMeetingService
  ) {}

  ngOnInit() {
    const userObs$ = this.store.select(selectAuthenticatedUser);

    this.userSubscription = userObs$.subscribe(user => {
      if (!user) {
        return;
      }

      // todo: "get my votes" and restore them in order if they exist otherwise default behavior
      const myRec = this.recommendations.find(
        // todo: improve this check
        r =>
          r.recommendedBy.firstName === user.firstName &&
          r.recommendedBy.lastName === user.lastName
      );

      if (myRec) {
        this.rankedRecommendations.push({
          book: myRec?.book,
          recommendedBy: myRec?.recommendedBy,
          rank: 1,
          isMine: true,
        });
      }

      const shuffled = shuffle(this.recommendations.filter(r => r !== myRec));

      shuffled.forEach(r => {
        this.rankedRecommendations.push({
          book: r.book,
          recommendedBy: r.recommendedBy,
          rank: this.rankedRecommendations.length + 1,
          isMine: false,
        });
      });
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  onDrop(event: DndDropEvent, list?: RankedBook[]) {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = list.length;
      }

      list.splice(index, 0, event.data);
    }
  }

  onDragged(item: RankedBook, list: RankedBook[]) {
    // this happens after onDrop

    const index = list.indexOf(item);
    list.splice(index, 1);
    list.forEach((r, i) => {
      r.rank = i + 1;
    });

    this.liveMeetingSvc.changeVote(
      this.meetingId,
      this.rankedRecommendationsToVotes(),
      false
    );
  }

  toggleVotesConfirmed() {
    this.votesConfirmed = !this.votesConfirmed;

    if (this.votesConfirmed) {
      this.liveMeetingSvc.changeVote(
        this.meetingId,
        this.rankedRecommendationsToVotes(),
        this.votesConfirmed
      );
    } else {
      this.liveMeetingSvc.unconfirmVote(this.meetingId);
    }

    // todo use live meeting state to determine if vote was confirmed on backend via meeting user state
  }

  rankedRecommendationsToVotes(): CreateBookVoteDto[] {
    return this.rankedRecommendations.map(r => ({
      bookId: r.book.id,
      rank: r.rank,
    }));
  }
}

interface RankedBook {
  book: BookDto;
  recommendedBy: UserSimpleDto;
  rank: number;
  isMine: boolean;
}
