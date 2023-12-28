import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app-state';
import { BooksPageComponent } from './books/books-page/books-page.component';
import { MeetingsPageComponent } from './meetings/meetings-page/meetings-page.component';
import {
  selectAuthenticatedUserIsAdmin,
  selectAuthenticatedUserIsVerified,
} from './users/state/users.selectors';
import { UsersPageComponent } from './users/users-page/users-page.component';

const canActivateVerified: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store<AppState>);
  return store.select(selectAuthenticatedUserIsVerified);
};

const canActivateAdmin: CanActivateFn = () => {
  const store = inject(Store<AppState>);
  return store.select(selectAuthenticatedUserIsAdmin);
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
    canActivate: [canActivateVerified],
    data: { animation: 'BooksPage' },
  },
  {
    path: 'meetings',
    component: MeetingsPageComponent,
    canActivate: [canActivateVerified],
    data: { animation: 'MeetingsPage' },
  },
  {
    path: 'users',
    component: UsersPageComponent,
    canActivate: [canActivateAdmin],
    data: { animation: 'UsersPage' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
