import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto } from '../../api/models';
import { AppState } from '../../app-state';
import { AuthService } from '../../services/auth.service';
import { selectAuthenticatedUser } from '../../users/state/users.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user$: Observable<UserDto | null> | undefined;

  constructor(
    store: Store<AppState>,
    private authService: AuthService
  ) {
    this.user$ = store.select(selectAuthenticatedUser);
  }

  async signIn(): Promise<void> {}

  async signOut(): Promise<void> {
    await this.authService.signOut();
    window.location.reload();
  }
}
