import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { UserDto } from './api/models';
import { BooksModule } from './books/books.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { SnowGeneratorComponent } from './special/snow/snow-generator/snow-generator.component';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    BooksModule,
    AsyncPipe,
    ToastsContainerComponent,
    SnowGeneratorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent {
  year = new Date().getFullYear();
  user?: UserDto;
  verified = false;
  isWinter = this.winter();
  snowEnabled = this.winter();

  constructor(
    authService: AuthService,
    private contexts: ChildrenOutletContexts,
    private elementRef: ElementRef
  ) {
    authService.apiUser$.subscribe(user => {
      this.user = user;
      this.verified = authService.isVerified();
    });

    if (localStorage.getItem('snow') === 'false') {
      this.snowEnabled = false;
    }
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

  winter(): boolean {
    const date = new Date();

    return date.getMonth() === 11 || date.getMonth() === 0;
  }

  snowSwitchChanged() {
    this.snowEnabled = !this.snowEnabled;

    localStorage.setItem('snow', `${this.snowEnabled}`);
  }
}
