import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-meeting-datetime-editor',
  templateUrl: './meeting-datetime-editor.component.html',
  styleUrls: ['./meeting-datetime-editor.component.css'],
})
export class MeetingDatetimeEditorComponent implements AfterViewInit {
  @Input()
  dateTime: Date | null = null;

  @Output()
  dateTimeChange = new EventEmitter<Date>();

  nextMeetingDate: NgbDateStruct = this.dateToNgbDateStruct(new Date());
  nextMeetingTime: NgbTimeStruct = { hour: 18, minute: 0, second: 0 };

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.dateTime) {
      this.nextMeetingDate = this.dateToNgbDateStruct(this.dateTime);
      this.nextMeetingTime = this.dateToNgbTimeStruct(this.dateTime);
    } else {
      this.dateTime = moment().add(1, 'hour').startOf('hour').toDate();

      this.nextMeetingDate = this.dateToNgbDateStruct(this.dateTime);
      this.nextMeetingTime = this.dateToNgbTimeStruct(this.dateTime);
    }

    setTimeout(this.changeDate.bind(this));
  }

  private dateToNgbDateStruct(date: Date): NgbDateStruct {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  private dateToNgbTimeStruct(date: Date): NgbTimeStruct {
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
  }

  changeDate() {
    this.dateTime = new Date(
      this.nextMeetingDate.year,
      this.nextMeetingDate.month - 1,
      this.nextMeetingDate.day,
      this.nextMeetingTime.hour,
      this.nextMeetingTime.minute,
      this.nextMeetingTime.second
    );

    this.dateTimeChange.emit(this.dateTime);
    this.cdr.detectChanges();
  }
}
