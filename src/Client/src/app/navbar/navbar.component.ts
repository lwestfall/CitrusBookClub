import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app-state';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { MeetingsModule } from '../meetings/meetings.module';
import { getNextMeeting } from '../meetings/state/meetings.actions';
import {
  selectAuthenticatedUserIsAdmin,
  selectAuthenticatedUserIsVerified,
} from '../users/state/users.selectors';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    CommonModule,
    LoginComponent,
    NgbNavModule,
    AsyncPipe,
    RouterModule,
    NgbCollapseModule,
    MeetingsModule,
    ClickOutsideDirective,
  ],
  standalone: true,
})
export class NavbarComponent implements AfterViewInit {
  verified$: Observable<boolean>;
  admin$: Observable<boolean>;
  isCollapsed = true;

  verifiedLinks = [
    {
      title: 'Books',
      route: 'books',
    },
    {
      title: 'Meetings',
      route: 'meetings',
    },
  ];

  adminLinks = [{ title: 'Users', route: 'users' }];

  @ViewChild('nav') nav!: ElementRef;
  @Output() heightChange = new EventEmitter<number>();

  previousHeight = 0;

  constructor(
    store: Store<AppState>,
    public route: ActivatedRoute
  ) {
    store.dispatch(getNextMeeting());

    this.verified$ = store.select(selectAuthenticatedUserIsVerified);
    this.admin$ = store.select(selectAuthenticatedUserIsAdmin);
  }

  ngAfterViewInit() {
    const resizeObserver = new ResizeObserver(() => {
      const height = this.nav.nativeElement.offsetHeight;

      if (height !== this.previousHeight) {
        this.heightChange.emit(this.nav.nativeElement.offsetHeight);
      }
    });

    resizeObserver.observe(this.nav.nativeElement);
  }
}
