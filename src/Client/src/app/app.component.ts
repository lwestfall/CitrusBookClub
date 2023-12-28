import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { BooksModule } from './books/books.module';
import { MeetingsModule } from './meetings/meetings.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SnowGeneratorComponent } from './special/snow/snow-generator/snow-generator.component';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';
import { UsersModule } from './users/users.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    BooksModule,
    MeetingsModule,
    UsersModule,
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
  isWinter = this.winter();
  snowEnabled = this.winter();

  constructor(
    private contexts: ChildrenOutletContexts,
    private elementRef: ElementRef
  ) {
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
