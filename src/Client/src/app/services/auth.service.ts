import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs';
import { UserDto } from '../api/models';
import { UsersService } from '../api/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticatedUser?: UserDto;
  private _socialUser?: SocialUser;
  private _roles?: string[];
  private _tokenExpiration?: Date;
  private _googleIdToken?: string | undefined;

  apiUser$: Subject<UserDto> = new Subject<UserDto>();

  constructor(
    private socialAuthService: SocialAuthService,
    private usersService: UsersService
  ) {
    if (localStorage.getItem('id_token')) {
      this.initApiUser();
    }

    this.socialAuthService.authState.subscribe(socialUser => {
      this._socialUser = socialUser;
      if (socialUser) {
        localStorage.setItem('id_token', this._socialUser.idToken);
        this._googleIdToken = socialUser.idToken;
      }
      this.initApiUser();
    });
  }

  private async initApiUser(): Promise<void> {
    this._authenticatedUser = await firstValueFrom(
      this.usersService.getAuthenticatedUser()
    );
    this._roles = this._authenticatedUser?.roles;
    this.apiUser$.next(this._authenticatedUser);
  }

  public get googleIdToken(): string | undefined {
    return this._googleIdToken;
  }

  get authenticatedUser(): UserDto {
    if (!this._authenticatedUser) {
      throw new Error('User is not authenticated');
    }

    return this._authenticatedUser;
  }

  isLoggedIn(): boolean {
    return !!this._authenticatedUser;
  }

  async signOut(): Promise<void> {
    localStorage.removeItem('id_token');
    this._authenticatedUser = undefined;
    this._socialUser = undefined;
    this._roles = undefined;
    this._tokenExpiration = undefined;
    this._googleIdToken = undefined;
  }

  isVerified(): boolean {
    return this.hasRole('Verified');
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  private hasRole(role: string): boolean {
    return this._roles?.includes(role) ?? false;
  }
}
