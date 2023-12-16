import { AsyncPipe } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { UserDto } from './api/models';
import { MeetingsModule } from './meetings/meetings.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    MeetingsModule,
    AsyncPipe,
    ToastsContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent {
  year = new Date().getFullYear();
  user?: UserDto;
  verified = false;

  constructor(
    authService: AuthService,
    private contexts: ChildrenOutletContexts,
    private elementRef: ElementRef
  ) {
    authService.apiUser$.subscribe(user => {
      this.user = user;
      this.verified = authService.isVerified();
    });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  onNavbarHeightChange(height: number) {
    this.elementRef.nativeElement.style.setProperty(
      '--navbar-height',
      `${height}px`
    );
  }
}
