import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DndDropEvent } from 'ngx-drag-drop';
import { Subscription } from 'rxjs';
import {
  BookDto,
  BookRecommendationForMeetingDto,
  UserSimpleDto,
} from '../../../api/models';
import { AppState } from '../../../app-state';
import { selectAuthenticatedUser } from '../../../users/state/users.selectors';

export const testData: RankedBook[] = [
  {
    book: {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      id: '1',
    },
    recommendedBy: {
      firstName: 'Luke',
      lastName: 'Doe',
    },
    rank: 1,
    isMine: true,
  },
  {
    book: {
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien',
      id: '2',
    },
    recommendedBy: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    rank: 2,
    isMine: false,
  },
  {
    book: {
      title: 'The Two Towers',
      author: 'J.R.R. Tolkien',
      id: '3',
    },
    recommendedBy: {
      firstName: 'Mike',
      lastName: 'Smith',
    },
    rank: 3,
    isMine: false,
  },
  {
    book: {
      title: 'The Return of the King',
      author: 'J.R.R. Tolkien',
      id: '4',
    },
    recommendedBy: {
      firstName: 'Bill',
      lastName: 'Jones',
    },
    rank: 4,
    isMine: false,
  },
];

@Component({
  selector: 'app-live-voting',
  templateUrl: './live-voting.component.html',
  styleUrls: ['./live-voting.component.css'],
})
export class LiveVotingComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  recommendations!: BookRecommendationForMeetingDto[];

  rankedRecommendations: RankedBook[] = [];

  userSubscription?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const userObs$ = this.store.select(selectAuthenticatedUser);

    this.userSubscription = userObs$.subscribe(user => {
      if (!user) {
        return;
      }

      this.rankedRecommendations = testData;

      // todo: reenable this
      // const myRec = this.recommendations.find(
      //   // todo: improve this check
      //   r =>
      //     r.recommendedBy.firstName === user.firstName &&
      //     r.recommendedBy.lastName === user.lastName
      // );

      // if (myRec) {
      //   this.rankedRecommendations.push({
      //     book: myRec?.book,
      //     recommendedBy: myRec?.recommendedBy,
      //     rank: 1,
      //     isMine: true,
      //   });
      // }

      // this.recommendations
      //   .filter(r => r !== myRec)
      //   .forEach(r => {
      //     this.rankedRecommendations.push({
      //       book: r.book,
      //       recommendedBy: r.recommendedBy,
      //       rank: this.rankedRecommendations.length + 1,
      //       isMine: false,
      //     });
      //   });
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

    // todo: update votes via signalr
  }
}

interface RankedBook {
  book: BookDto;
  recommendedBy: UserSimpleDto;
  rank: number;
  isMine: boolean;
}
