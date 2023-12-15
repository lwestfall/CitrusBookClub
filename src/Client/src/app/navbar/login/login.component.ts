import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDto } from '../../api/models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user?: UserDto;

  constructor(private authService: AuthService) {
    authService.apiUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.authenticatedUser;
    }
  }

  async signIn(): Promise<void> {}

  async signOut(): Promise<void> {
    await this.authService.signOut();
    this.user = undefined;
    // reload
    window.location.reload();
  }
}
