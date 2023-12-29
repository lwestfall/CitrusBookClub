import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto } from '../api/models';
import { AppState } from '../app-state';
import { getAuthenticatedUser } from '../users/state/users.actions';
import { selectAuthenticatedUser } from '../users/state/users.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _socialUser?: SocialUser;
  private _tokenExpiration?: Date;
  private _googleIdToken?: string | undefined;

  apiUser$: Observable<UserDto | null> | undefined;

  constructor(
    private store: Store<AppState>,
    private socialAuthService: SocialAuthService
  ) {
    this.apiUser$ = this.store.select(selectAuthenticatedUser);

    this.socialAuthService.authState.subscribe(socialUser => {
      this._socialUser = socialUser;
      if (socialUser) {
        localStorage.setItem('id_token', this._socialUser.idToken);
        this._googleIdToken = socialUser.idToken;
        this.store.dispatch(getAuthenticatedUser());
      }
    });
  }

  public get googleIdToken(): string | undefined {
    return this._googleIdToken;
  }

  async signOut(): Promise<void> {
    localStorage.removeItem('id_token');
    this._socialUser = undefined;
    this._tokenExpiration = undefined;
    this._googleIdToken = undefined;

    // todo: action to clear users state
  }
}
