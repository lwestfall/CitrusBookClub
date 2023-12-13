import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDto } from './api/models';
import { MeetingsModule } from './meetings/meetings.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    MeetingsModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cbc';
  user?: UserDto;
  verified = false;

  constructor(authService: AuthService) {
    authService.apiUser$.subscribe(user => {
      this.user = user;
      this.verified = authService.hasRole('Verified');
    });
  }
}
