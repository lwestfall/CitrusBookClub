import { Component, Input } from '@angular/core';
import { BookRecommendationForMeetingDto } from '../../../api/models';

@Component({
  selector: 'app-meeting-recommendations',
  templateUrl: './meeting-recommendations.component.html',
  styleUrls: ['./meeting-recommendations.component.css'],
})
export class MeetingRecommendationsComponent {
  @Input({ required: true })
  bookRecommendations!: BookRecommendationForMeetingDto[];
  @Input() presenterMode: boolean = false;
  @Input() myRecommendedBookId: string | undefined;

  constructor() {}
}
