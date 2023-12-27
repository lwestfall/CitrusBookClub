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
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { MeetingsModule } from '../meetings/meetings.module';
import { AuthService } from '../services/auth.service';
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
  verified = false;
  admin = false;
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
    authService: AuthService,
    public route: ActivatedRoute
  ) {
    authService.apiUser$.subscribe(() => {
      this.verified = authService.isVerified();
      this.admin = authService.isAdmin();
    });
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
