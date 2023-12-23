import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { BooksPageComponent } from './books/books-page/books-page.component';
import { AuthService } from './services/auth.service';

const canActivateVerified: CanActivateFn = () => {
  if (inject(AuthService).isVerified()) {
    return true;
  } else {
    inject(Router).navigate(['/']);
  }

  return false;
};

const canActivateAdmin: CanActivateFn = () => {
  if (inject(AuthService).isAdmin()) {
    return true;
  } else {
    inject(Router).navigate(['/']);
  }

  return false;
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(mod => mod.HomeComponent),
    data: { animation: 'HomePage' },
  },
  {
    path: 'books',
    component: BooksPageComponent,
    // loadComponent: () =>
    //   import('./books/books-page/books-page.component').then(
    //     mod => mod.BooksPageComponent
    //   ),
    canActivate: [canActivateVerified],
    data: { animation: 'BooksPage' },
  },
  {
    path: 'meetings',
    loadComponent: () =>
      import('./meetings/meetings-page/meetings-page.component').then(
        mod => mod.MeetingsPageComponent
      ),
    canActivate: [canActivateVerified],
    data: { animation: 'MeetingsPage' },
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users-page/users-page.component').then(
        mod => mod.UsersPageComponent
      ),
    canActivate: [canActivateAdmin],
    data: { animation: 'UsersPage' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
