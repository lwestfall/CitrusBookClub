import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MeetingCountdownComponent } from '../meetings/meeting-countdown/meeting-countdown.component';
import { LoginComponent } from '../navbar/login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    LoginComponent,
    RouterModule,
    MeetingCountdownComponent,
  ],
  standalone: true,
})
export class HomeComponent implements OnInit {
  signedIn = false;
  verified = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signedIn = this.authService.isLoggedIn();
    this.verified = this.authService.isVerified();

    this.authService.apiUser$.subscribe(() => {
      this.signedIn = this.authService.isLoggedIn();
      this.verified = this.authService.isVerified();
    });
  }
}
